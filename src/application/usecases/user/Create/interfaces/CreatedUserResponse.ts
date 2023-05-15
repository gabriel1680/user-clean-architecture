import { UserViewDTO } from "@application/usecases/user/shared/interfaces";

export default interface CreatedUserResponse {
    user: UserViewDTO;
    confirmLink: string;
}
