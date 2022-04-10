import UniqueIdGenerator from "@domain/services/UniqueIdGeneratorservice";
import { v4 } from "uuid";

export default class IdGenerator implements UniqueIdGenerator {
    public generate(): string {
        return v4();
    }
}