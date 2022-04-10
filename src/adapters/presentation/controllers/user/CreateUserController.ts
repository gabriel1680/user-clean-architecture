import UserData from "@application/usecases/user/Create/interfaces/UserData";
import HttpResponse from "../interfaces/HttpResponse";
import { badRequest, created, serverError } from "../helpers/httpResponses";
import UserCreator from "@application/usecases/user/Create/interfaces/UserCreator.interface";
import WelcomeMailSender from "@application/usecases/user/SendWelcomeMail/WelcomeMailSender.interface";
import { InvalidParametersError } from "@application/errors";


export default class CreateUserController {
    constructor(
        public createUser: UserCreator,
        public sendWelcomeMail: WelcomeMailSender
    ) { }

    public async handle(data: UserData): Promise<HttpResponse> {
        try {
            const { firstName, lastName, email, password, role } = data;
            const emptyParams = !firstName || !lastName || !email || !password || !role;
            if (emptyParams) return badRequest(new InvalidParametersError());

            const userCreatedOrError = await this.createUser.execute(data);
            if (userCreatedOrError instanceof Error) return badRequest(userCreatedOrError);

            this.sendWelcomeMail.execute(userCreatedOrError)
                .catch(error => console.log("Error on sending welcome email => ", error)); // pending promise

            return created(userCreatedOrError.user);
        } catch (error) {
            console.error("[Create User Error]", error);
            return serverError(error.message);
        }
    }
}