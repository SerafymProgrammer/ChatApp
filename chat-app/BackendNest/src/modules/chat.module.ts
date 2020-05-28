import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Messages } from '../models/message.model';
import { ChatService } from './../services/chat.service';

@Module({
  imports: [SequelizeModule.forFeature([Messages])],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
