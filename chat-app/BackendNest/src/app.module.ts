import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { LoggerMiddleware } from './common/logger.middleware';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AppGateway } from './gateways/app.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { Messages } from './models/message.model';
import { Users } from './models/users.model';
import { Rooms } from './models/rooms.model';
import { RoomsUsers } from './models/RoomsUsers.model';
import { UsersModule } from './modules/users.module';
import { ChatModule } from './modules/chat.module';
import { RoomsModule } from './modules/rooms.module';
import { RoomsUsersModule } from './modules/roomsUsers.module';

@Module({
  imports: [
  UsersModule,
  ChatModule,
  RoomsModule,
  RoomsUsersModule,
  SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'qwertyui',
    database: 'ChatAppShema',
    models: [Users, Messages, Rooms, RoomsUsers],
    autoLoadModels: true,
    synchronize: true,
    }),

    JwtModule.register({
      secret: 'x',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AppGateway,
    AuthService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.ALL },
        { path: 'auth', method: RequestMethod.ALL },
      );
  }
}
