import User from "@domain/model/user/User";

export default interface ForgotTokenRepository {
    findByEmail(email: string): Promise<User>;
    doUpdate(user: User): Promise<void>;
}
