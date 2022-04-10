import "reflect-metadata";
import { createConnection } from "typeorm";

async function connect()
{
    return await createConnection({
        type: "sqlite",
        database: "./tests/database/database.sqlite",
        synchronize: true,
        dropSchema: true,
        logging: false,
        entities: ["src/infra/database/models/**/*.ts"],
        migrations: ["src/infra/database/migrations/**/*.ts"],
    });
}

export default connect;