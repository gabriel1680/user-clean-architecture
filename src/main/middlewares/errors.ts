import { NextFunction, Request, Response } from "express";
import { colors } from "@main/config/console";

export function handleErrors(error: Error, req: Request, res: Response, next: NextFunction): Response {
    console.error(colors.FgRed,"[GLOBAL ERROR] => ", error);
    return res.status(500).json({ description: "Erro Interno do Servidor" });
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction): Response {
    return res.status(404).json("Recurso não encontrado");
}
