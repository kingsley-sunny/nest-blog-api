import { EnvironmentService } from './src/config/environment/environment.service';

const { dbHost, dbName, dbPassword, dbPort, dbUser } =
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
    directory: './src/database/migrations',
    database: 'mysql',
    extension: 'ts',
  },
  seeds: {
    directory: './src/database/seeds',
    extension: 'ts',
  },
};

export default KnexConfig;
