import InternalServerError from "../errors/InternalServerError";
import HttpResponse from "../interfaces/HttpResponse";

export const ok = (data: any): HttpResponse => ({ statusCode: 200, body: data });

export const created = (data: any): HttpResponse => ({ statusCode: 201, body: data });

export const noBody = (): HttpResponse => ({ statusCode: 204 });

export const badRequest = (error: Error): HttpResponse => ({ 
    statusCode: 400, 
    body: error.message 
});

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: "Não autorizado"
});

export const serverError = (message: string): HttpResponse => ({ 
    statusCode: 500, 
    body: process.env.ENV === 'development' ? new InternalServerError(message) : 'Internal Server Error'
});