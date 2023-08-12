import { EnvironmentService } from './src';

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
  pool: {
    min: 0,
    max: 10,
  },
  migrations: {
    directory: './src/database/migrations',
    database: 'mysql',
    extension: 'ts',
  },
  debug: true,
};

export default KnexConfig;
