import dotenv from "dotenv";
import "express-async-errors";

import { app as serverConfig } from "../config/configs";
import Connection from "@infra/database/Connection";
import { colors } from "@main/config/console";

dotenv.config();

Connection.tryToConnect()
    .then((connection) => {
        //@ts-ignore
        console.log(
            colors.FgWhite,
            `Database ${colors.FgCyan}"${connection.options.database}"${colors.FgWhite} is connected on port ${colors.FgCyan}${connection.options.port}`
        );
    })
    .catch((e) =>
        console.error(colors.FgRed, `Database connection error: ${e.message}`)
    )
    .finally(() => {
        const port = serverConfig.port;
        const app = require("../config/app").default;
        app.listen(port, () =>
            console.log(
                colors.FgWhite,
                `\nserver is up and running on port ${colors.FgCyan}${port}`,
                colors.FgWhite
            )
        );
    });
