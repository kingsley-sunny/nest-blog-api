import { Injectable } from '@nestjs/common';
import { IEnvironment } from './environment.interface';

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
      dbPort: DB_PORT,
      dbUser: DB_USER,
    };
  }

  public static getValue(value: keyof IEnvironment): string {
    return this.getValues()[value];
  }
}
