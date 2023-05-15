import { UserViewDTO } from "../shared/interfaces";

export interface UserLister {
    execute(): Promise<UserViewDTO[]>;
}
