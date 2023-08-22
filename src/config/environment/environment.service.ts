import { Injectable, Logger } from '@nestjs/common';
import * as env from 'dotenv';
import { EnvironmentInterface } from './environment.interface';

env.config();

@Injectable()
export class EnvironmentService {
  public static getValues(): EnvironmentInterface {
    Logger.log('getValues', 'EnvironmentService');

    const {
      APP_PORT,
      DB_USER,
      DB_PASSWORD,
      DB_HOST,
      DB_NAME,
      DB_PORT,
      JWT_SECRET_TOKEN,
      RESEND_API_KEY,
    } = process.env;

    return {
      appPort: APP_PORT,
      dbHost: DB_HOST,
      dbName: DB_NAME,
      dbPassword: DB_PASSWORD,
      dbPort: DB_PORT,
      dbUser: DB_USER,
      jwtSecretToken: JWT_SECRET_TOKEN,
      resendApiKey: RESEND_API_KEY,
    };
  }

  /**
   * name
   */
  public static getValue(value: keyof EnvironmentInterface) {
    Logger.log('getValue', 'EnvironmentService');

    const values = this.getValues();

    return values[value];
  }
}
