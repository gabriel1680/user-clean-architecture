import { UserRepository } from "@application/usecases/user/shared/interfaces";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import UserSQL from "../models/UserSQL";
import User from "@domain/model/user/User";
import {
    UserDbConverter,
    UserDomainToDbConverter,
} from "@infra/database/helpers/user";

@EntityRepository(UserSQL)
class UserRepositoryTypeORM
    extends Repository<UserSQL>
    implements UserRepository
{
    public async exists(email: string): Promise<boolean> {
        const response = await this.query(
            "SELECT CASE WHEN EXISTS (SELECT * FROM users WHERE email = $1) THEN " +
                "true ELSE false END",
            [email]
        );
        return response[0].case;
    }

    public async existsById(id: string): Promise<boolean> {
        const response = await this.query(
            "SELECT CASE WHEN EXISTS (SELECT * FROM users WHERE id = $1) THEN " +
                "true ELSE false END",
            [id]
        );
        return response[0].case;
    }

    public async persist(user: User): Promise<void> {
        await this.save(this.create(UserDomainToDbConverter(user)));
    }

    public async findByEmail(email: string): Promise<User> {
        return UserDbConverter(await this.findOne({ email: email }));
    }

    public async getRole(id: string): Promise<string> {
        const { role } = await this.query(
            "SELECT role FROM users WHERE id=$1",
            [id]
        );
        return role;
    }

    public async findByConfirmLink(confirmLink: string): Promise<boolean> {
        const response = await this.query(
            "SELECT CASE WHEN EXISTS (SELECT * FROM users WHERE confirm_link = $1)" +
                " THEN true ELSE false END",
            [confirmLink]
        );
        return response[0].case;
    }

    public async removeConfirmLink(confirmLink: string): Promise<void> {
        await this.query(
            "UPDATE users SET confirm_link=NULL WHERE confirm_link=$1",
            [confirmLink]
        );
    }

    public async findById(id: string): Promise<User> {
        return UserDbConverter(await this.findOne(id));
    }

    public async list(): Promise<User[]> {
        return (await this.find()).map((dbUser) => UserDbConverter(dbUser));
    }

    public async doUpdate(model: User): Promise<void> {
        await this.save(UserDomainToDbConverter(model));
    }

    public async doDelete(model: User): Promise<void> {
        await this.delete(UserDomainToDbConverter(model));
    }
}

export default getCustomRepository(UserRepositoryTypeORM);
