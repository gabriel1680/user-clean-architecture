import "reflect-metadata";
import { createConnection } from "typeorm";

export default class Connection {
    public static async tryToConnect() {
        return await createConnection();
    }
}