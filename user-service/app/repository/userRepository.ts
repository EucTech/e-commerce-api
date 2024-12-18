import { injectable } from "tsyringe";
import { UserModel } from "../models/UserModel";
import { DBClient } from "app/utility/databaseClient";

@injectable()
export class UserRepository {
  constructor() {}

  async createAccount({ email, password, salt, phone, userType }: UserModel) {
    const client = await DBClient();
    await client.connect();

    const queryString = "INSERT INTO users (phone, email, password, salt, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [phone, email, password, salt, userType];
    const result = await client.query(queryString, values);
    await client.end();
    if (result.rowCount > 0) {
      return result.rows[0] as UserModel;
    }
  }
}
