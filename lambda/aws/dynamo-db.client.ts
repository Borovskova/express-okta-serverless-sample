import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { config } from "lambda/config";

const { DEFAULT_AWS_REGION } = config;

export class AwsDynamoDBClient {
  private static client: DynamoDBClient;

  static getClient(): DynamoDBClient {
    if (!AwsDynamoDBClient.client) {
      AwsDynamoDBClient.client = new DynamoDBClient({
        region: DEFAULT_AWS_REGION,
      });
    }

    return AwsDynamoDBClient.client;
  }
}
