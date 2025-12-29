export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  requestId?: string;
  [key: string]: unknown;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: {
    message: string;
    stack?: string;
  };
}

export interface LoggerTransport {
  log: (entry: LogEntry) => void;
}

export interface LoggerConfig {
  enabled?: boolean;
  minLevel?: LogLevel;
  transports?: LoggerTransport[];
}
