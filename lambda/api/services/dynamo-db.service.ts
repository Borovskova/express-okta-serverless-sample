import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

import { AwsDynamoDBClient } from "lambda/aws/dynamo-db.client";
import { logger } from "lambda/utils/logger";

export class DynamoDBService {
  static async getMany(tableName: string): Promise<Array<any>> {
    const client = AwsDynamoDBClient.getClient();
    try {
      const params = {
        TableName: tableName,
      };

      const command = new ScanCommand(params);
      const { Items } = await client.send(command);

      if (!Items || Items.length === 0) {
        return [];
      }

      return Items.map((item) => unmarshall(item));
    } catch (error) {
      logger(
        "error",
        `Error during DynamoDB scan operation. Table: ${tableName}. Err: ${error?.message || "Unknown error"}`,
        `dynamo-db.service:getMany:${tableName}`,
      );

      throw error;
    }
  }
}
