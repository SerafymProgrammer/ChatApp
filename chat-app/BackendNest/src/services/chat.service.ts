import { Injectable, Inject } from '@nestjs/common';
import { Message } from '../models/message.model';
import { ChatRepository } from '../repositories/chat.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

  async getMessages(): Promise<Message[]> {
    return await this.chatRepository.getMessages();
  }

  async getMessagesByAuthor(authorName): Promise<Message[]> {
    return await this.chatRepository.getMessagesByAuthor(authorName);
  }

  async createNewMessage(msg: any) {
    //  tslint:disable-next-line:variable-name

    return await this.chatRepository.createNewMessage(msg);
  }
}