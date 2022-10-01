import { Request, Response, NextFunction } from "express";
import ResponseMessage from "../types/responseMessage";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response<ResponseMessage>,
    next: NextFunction
) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
    });
}
