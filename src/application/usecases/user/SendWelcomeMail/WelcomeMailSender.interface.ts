import CreatedUserResponse from "@application/usecases/user/Create/interfaces/CreatedUserResponse";

export default interface WelcomeMailSender {
    execute(data: CreatedUserResponse): Promise<void>
}