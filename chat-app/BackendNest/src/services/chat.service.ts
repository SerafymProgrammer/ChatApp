import { Injectable } from '@nestjs/common';
import { Messages } from '../models/message.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Messages) private messageModel: typeof Messages) {}

  public getMessages(): Promise<Messages[]> {
    return this.messageModel.findAll<Messages>();
  }

  public getMessagesByAuthor(authorMessage: string): Promise<Messages[]> {
    return this.messageModel.findAll<Messages>({
      where: {
        authorMessage,
      },
    });
  }

  createNewMessage(
    textMessage: string,
    authorMessage: string,
    nickNameColor: string,
    timeMessage: string,
  ) {
    return this.messageModel.create({
      textMessage,
      authorMessage,
      colorAuthorName: nickNameColor,
      timeMessage,
    });
  }
}
