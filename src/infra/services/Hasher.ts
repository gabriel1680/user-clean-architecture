import { HashPasswordService } from "@domain/model/user/service";
import { compareSync, hashSync } from "bcryptjs";

export default class Hasher implements HashPasswordService {
    public hash(password: string): string {
        return hashSync(password);
    }

    public compare(password: string, hash: string): boolean {
        return compareSync(password, hash);
    }
}
