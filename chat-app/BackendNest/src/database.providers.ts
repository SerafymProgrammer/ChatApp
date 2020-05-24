import { Sequelize } from 'sequelize-typescript';
import { Message } from './models/message.model';
import { User } from './models/users.model';
import { dataBaseInfoConnect } from './constants/constants';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(dataBaseInfoConnect);
      sequelize.addModels([User, Message]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
