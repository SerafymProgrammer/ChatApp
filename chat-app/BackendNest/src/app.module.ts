import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { LoggerMiddleware } from './common/logger.middleware';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { HttpStrategy } from './common/http.strategy';
import { UsersRepository } from './repositories/users.repository';
import { databaseProviders } from './database.providers';
import { usersProviders } from './providers/users.providers';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppGateway } from './gateways/app.gateway';

import { ChatService } from './services/chat.service';
import { ChatRepository } from './repositories/chat.repository';
import { chatProviders } from './providers/chat.providers';

@Module({
  imports: [
    JwtModule.register({
      secret: 'sdfaasad',
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    AppGateway,

    UsersService,

    AuthService,

    ChatService,
    HttpStrategy,

    UsersRepository,

    ChatRepository,

    ...databaseProviders,

    ...usersProviders,

    ...chatProviders,
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
