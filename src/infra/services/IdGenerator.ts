import UniqueIdGenerator from "@application/services/UniqueIdGenerator";
import { v4 } from "uuid";

export default class IdGenerator implements UniqueIdGenerator {
    public generate(): string {
        return v4();
    }
}
