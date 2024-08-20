import { EnvironmentService } from './src/config/environment/environment.service';

const { dbHost, dbName, dbPassword, dbPort, dbUser, node_env } =
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
    directory:
      node_env === 'production' || node_env === 'staging'
        ? './dist/src/database/migrations/'
        : './src/database/migrations/',
    database: 'mysql',
    extension: 'ts',
  },
  seeds: {
    directory:
      node_env === 'production' || node_env === 'staging'
        ? './dist/src/database/seeds/'
        : './src/database/seeds/',
    extension: 'ts',
  },
};

export default KnexConfig;
