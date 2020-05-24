import { Environment, environment } from '../environment/environment';

// tslint:disable-next-line:variable-name
export const Users_Repository = 'USERS_REPOSITORY';

export const Chat_Repository = 'CHAT_REPOSITORY';
// tslint:disable-next-line:variable-name

const env: Environment = environment();

export const dataBaseInfoConnect = {
  operatorsAliases: env.operatorsAliases,
                dialect: env.dialect,
                host: env.host,
                port: env.port,
                username: env.username,
                password: env.password,
                database: env.database,
  };
