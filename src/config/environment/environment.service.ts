import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { IEnvironment } from './environment.interface';

dotenv.config();

@Injectable()
export class EnvironmentService {
  public static getValues(): IEnvironment {
    const { TZ, APP_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_HOST } =
      process.env;

    return {
      appPort: APP_PORT,
      dbHost: DB_HOST,
      dbName: DB_NAME,
      dbPassword: DB_PASSWORD,
      dbPort: DB_PORT as any,
      dbUser: DB_USER,
    };
  }

  public static getValue(value: keyof IEnvironment): any {
    return this.getValues()[value];
  }
}
