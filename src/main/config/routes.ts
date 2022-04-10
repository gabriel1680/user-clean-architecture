import { Router } from "express";
import * as fs from "fs";

export default function routes(): Router {
    const router = Router();
    fs.readdirSync(`${__dirname}/../routes`).forEach(file => {
        router.use(require(`../routes/${file}`).default());
    });
    return router;
}