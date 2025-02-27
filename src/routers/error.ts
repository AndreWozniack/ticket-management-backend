import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error("Erro interno:", error);
    res.status(500).json({ error: error.message });
}