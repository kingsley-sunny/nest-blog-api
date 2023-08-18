import { Injectable } from '@nestjs/common';
import * as env from 'dotenv';
import { EnvironmentInterface } from './environment.interface';

env.config();

@Injectable()
export class EnvironmentService {
  public static getValues(): EnvironmentInterface {
    const {
      APP_PORT,
      DB_USER,
      DB_PASSWORD,
      DB_HOST,
      DB_NAME,
      DB_PORT,
      JWT_SECRET_TOKEN,
    } = process.env;

    return {
      appPort: APP_PORT,
      dbHost: DB_HOST,
      dbName: DB_NAME,
      dbPassword: DB_PASSWORD,
      dbPort: DB_PORT,
      dbUser: DB_USER,
      jwtSecretToken: JWT_SECRET_TOKEN,
    };
  }

  /**
   * name
   */
  public static getValue(value: keyof EnvironmentInterface) {
    const values = this.getValues();

    return values[value];
  }
}
