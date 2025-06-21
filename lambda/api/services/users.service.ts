import { logger } from "lambda/utils/logger";
import { IUser } from "../interfaces/user.interface";
import { DynamoDBService } from "./dynamo-db.service";

export class UsersService {
  static async getUsersList(): Promise<{
    data: Array<IUser> | null;
    error: string | null;
  }> {
    try {
      const usersTableName: string = "users";
      const usersList = await DynamoDBService.getMany(usersTableName);
      logger(
        "info",
        "Users list successfuly retrieved",
        "users.service:getUsersList",
      );

      return { data: usersList, error: null };
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }
}
