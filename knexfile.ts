import { join } from 'path';

console.log('🚀 ~~ file: knexfile.ts:2 ~~ path:', join);

const KnexConfig = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'bosslikeme',
    database: 'blog_app',
  },
  migrations: {
    directory: join(__dirname, 'src', 'database', 'migrations'),
    database: 'mysql',
    extension: 'ts',
  },
};

export default KnexConfig;
