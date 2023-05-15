import { DomainError } from "@domain/errors";
import { ApplicationError } from "@application/errors";
import { UserFactory } from "@domain/factories";
import {
    UniqueIdGeneratorService,
    HashPasswordService,
} from "@domain/services";
import User from "@domain/entities/user/User";
import { UserExistsError } from "@application/usecases/user/shared/errors";
import { CreateRepository } from "../../../interfaces/DefaultRepositories";
import UserData from "@application/usecases/user/Create/interfaces/UserData";
import UserCreator from "./interfaces/UserCreator.interface";
import UserToView from "../shared/helpers/UserToView";
import CreatedUserResponse from "@application/usecases/user/Create/interfaces/CreatedUserResponse";

export default class CreateUser implements UserCreator {
    constructor(
        private hashService: HashPasswordService,
        private userRepository: CreateRepository<User>,
        private idGeneratorService: UniqueIdGeneratorService
    ) {}

    public async execute({
        firstName,
        lastName,
        email,
        role,
        password,
    }: UserData): Promise<
        ApplicationError | DomainError | CreatedUserResponse
    > {
        const userOrError: User | DomainError = UserFactory.create({
            id: this.idGeneratorService.generate(),
            firstName,
            lastName,
            email,
            password,
            role,
            confirmLink: `/users/confirm-account/${this.idGeneratorService.generate()}`,
        });
        if (userOrError instanceof Error) return userOrError;

        if (await this.userRepository.exists(email))
            return new UserExistsError();

        userOrError.hashPassword(
            this.hashService.hash(userOrError.password.value)
        );
        await this.userRepository.persist(userOrError);

        return {
            user: new UserToView(userOrError),
            confirmLink: userOrError.confirmLink,
        };
    }
}
