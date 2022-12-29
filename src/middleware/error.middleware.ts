import { Response, Request, NextFunction } from "express";
import HttpException from '../utils/exceptions/http.exception';

function ErrorMiddleware(
    error: HttpException, 
    req: Request, 
    resp: Response, 
    next: NextFunction
): void 
{
    const status = error.status || 500;
    const message = error.message || "Something went wrong";

    resp.status(status).send({
        status, message
    });
}

export default ErrorMiddleware;