import * as dotenv from 'dotenv';
import { join } from 'path';
import { EnvironmentService } from './src/config/environment/environment.service';

dotenv.config();

const { dbHost, dbPort, dbUser, dbPassword, dbName } =
  EnvironmentService.getValues();

const KnexConfig = {
  client: 'mysql2',
  connection: {
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName,
  },
  migrations: {
    directory: join(__dirname, 'src', 'database', 'migrations'),
    database: 'mysql',
    extension: 'ts',
  },
};

export default KnexConfig;
