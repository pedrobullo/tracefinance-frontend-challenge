import type {
  LogLevel,
  LogContext,
  LogEntry,
  LoggerConfig,
  LoggerTransport,
} from "./types";
import { ConsoleTransport } from "./transports";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private config: Required<LoggerConfig>;
  private transports: LoggerTransport[];

  constructor(config: LoggerConfig = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      minLevel: config.minLevel ?? "debug",
      transports: config.transports ?? [new ConsoleTransport()],
    };
    this.transports = this.config.transports;
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[this.config.minLevel];
  }

  private createEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error: error ? { message: error.message, stack: error.stack } : undefined,
    };
  }

  private log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): void {
    if (!this.shouldLog(level)) return;

    const entry = this.createEntry(level, message, context, error);
    this.transports.forEach((transport) => transport.log(entry));
  }

  debug(message: string, context?: LogContext): void {
    this.log("debug", message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log("warn", message, context);
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const err = error instanceof Error ? error : undefined;
    this.log("error", message, context, err);
  }

  child(defaultContext: LogContext): ChildLogger {
    return new ChildLogger(this, defaultContext);
  }
}

class ChildLogger {
  constructor(
    private parent: Logger,
    private defaultContext: LogContext
  ) {}

  private mergeContext(context?: LogContext): LogContext {
    return { ...this.defaultContext, ...context };
  }

  debug(message: string, context?: LogContext): void {
    this.parent.debug(message, this.mergeContext(context));
  }

  info(message: string, context?: LogContext): void {
    this.parent.info(message, this.mergeContext(context));
  }

  warn(message: string, context?: LogContext): void {
    this.parent.warn(message, this.mergeContext(context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    this.parent.error(message, error, this.mergeContext(context));
  }
}

const isDev =
  typeof process !== "undefined" && process.env?.NODE_ENV === "development";

export const logger = new Logger({
  enabled: true,
  minLevel: isDev ? "debug" : "info",
});

export { Logger };
