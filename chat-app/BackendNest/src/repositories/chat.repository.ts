import { Injectable, Inject } from '@nestjs/common';
import { Messages } from '../models/message.model';

@Injectable()
export class ChatRepository {
  constructor(
    @Inject('CHAT_REPOSITORY') private chatRepository: typeof Messages,
  ) {}

  async getMessages(): Promise<Messages[]> {
    return await this.chatRepository.findAll<Messages>();
  }

  async getMessagesByAuthor(authorName): Promise<Messages[]> {
    return await this.chatRepository.findAll<Messages>({
      where: {
        authorMessage: authorName,
      },
    });
  }

  async createNewMessage(msg: any) {
    return await this.chatRepository.create(msg);
  }
}
