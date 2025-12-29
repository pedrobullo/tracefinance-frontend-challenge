import type { LogEntry, LoggerTransport } from "../types";

const LEVEL_COLORS: Record<string, string> = {
  debug: "\x1b[36m",
  info: "\x1b[32m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
};

const RESET = "\x1b[0m";

export class ConsoleTransport implements LoggerTransport {
  log(entry: LogEntry): void {
    const color = LEVEL_COLORS[entry.level] || "";
    const prefix = `${color}[${entry.level.toUpperCase()}]${RESET}`;
    const timestamp = entry.timestamp;
    const contextStr = entry.context ? ` ${JSON.stringify(entry.context)}` : "";
    const errorStr = entry.error
      ? `\n  Error: ${entry.error.message}${entry.error.stack ? `\n  Stack: ${entry.error.stack}` : ""}`
      : "";

    if (typeof window === "undefined") {
      process.stdout.write(
        `${prefix} ${timestamp} ${entry.message}${contextStr}${errorStr}\n`
      );
    } else {
      const consoleMethod =
        entry.level === "error"
          ? "error"
          : entry.level === "warn"
            ? "warn"
            : "log";
      const args: unknown[] = [`${prefix} ${entry.message}`];
      if (entry.context) args.push(entry.context);
      if (entry.error) args.push(entry.error);
      console[consoleMethod](...args);
    }
  }
}
