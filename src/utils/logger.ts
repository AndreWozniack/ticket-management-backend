//import * as fs from "fs";
//import * as path from "path";

export enum LogLevel {
	DEBUG = "debug",
	INFO = "info",
	WARN = "warn",
	ERROR = "error"
}

export class Logger {
	private level: LogLevel;
	//private logFile: string;

	constructor(level?: LogLevel,) {
		this.level = level || (process.env.NODE_ENV === "development" ? LogLevel.DEBUG : LogLevel.INFO);
		//this.logFile = logFile;
		//const dir = path.dirname(this.logFile);
		//if (!fs.existsSync(dir)) {
		//	fs.mkdirSync(dir, { recursive: true });
		//}
	}

	private writeLog(message: string): void {
		const timestamp = new Date().toISOString();
		const logMessage = `${timestamp} ${message}\n`;
		//fs.appendFileSync(this.logFile, logMessage);
	}

	public debug(message: string, ...args: any[]): void {
		if (process.env.NODE_ENV !== "development") return;
		const formatted = `[DEBUG] ${message} ${args.join(" ")}`;
		console.debug(formatted);
		this.writeLog(formatted);
	}

	public info(message: string, ...args: any[]): void {
		const formatted = `[INFO] ${message} ${args.join(" ")}`;
		console.info(formatted);
		this.writeLog(formatted);
	}

	public warn(message: string, ...args: any[]): void {
		if (process.env.NODE_ENV !== "development") return;
		const formatted = `[WARN] ${message} ${args.join(" ")}`;
		console.warn(formatted);
		this.writeLog(formatted);
	}

	public error(message: string, ...args: any[]): void {
		const formatted = `[ERROR] ${message} ${args.join(" ")}`;
		console.error(formatted);
		this.writeLog(formatted);
	}
}

export const logger = new Logger();