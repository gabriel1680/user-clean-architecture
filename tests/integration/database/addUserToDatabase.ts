import UserMongo from "../../../src/infra/database/models/UserMongo";
import { getConnection } from "typeorm";

async function addUserToDatabase(user: UserMongo): Promise<void> {
	const conn = await getConnection();

	const rawQuery = "INSERT INTO users " +
			"(id, first_name, last_name, email, password, role, confirm_link, forgot_token, created_at, updated_at) " +
			`VALUES (${ Object.values(user).map(val => "\"" + val + "\"").join(", ") })`
	await conn.query(rawQuery);
}

export default addUserToDatabase;