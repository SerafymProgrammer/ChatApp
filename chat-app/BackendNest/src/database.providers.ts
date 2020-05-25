import { Sequelize } from 'sequelize-typescript';
import { Messages } from './models/message.model';
import { Users } from './models/users.model';
import { dataBaseInfoConnect } from './constants/constants';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(dataBaseInfoConnect);
      sequelize.addModels([Users, Messages]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
