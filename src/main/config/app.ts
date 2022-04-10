import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import express from "express";

import { handleErrors, notFoundHandler } from "../middlewares/errors";
import routes from "./routes";


const app = express();
// seta https headers para segurança
app.use(helmet());
// desabilita header x-powered-by
app.disable("x-powered-by");
// adiciona configurações de cors
app.use(cors());
// comprime as respostas (ganho em performance)
app.use(compression());
// converte as respostas pra json
app.use(express.json());
// permite que o express lide com o padrão urlenconded
app.use(express.urlencoded({ extended: true }));

app.use(routes());

app.use(notFoundHandler);

app.use(handleErrors);

export default app;