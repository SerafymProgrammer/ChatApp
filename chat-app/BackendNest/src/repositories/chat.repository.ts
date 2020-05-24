import { Injectable, Inject } from '@nestjs/common';
import { Message} from '../models/message.model';

// @EntityRepository(Book)

@Injectable()
export class ChatRepository {
    constructor(@Inject('CHAT_REPOSITORY') private chatRepository: typeof Message) {
    }

    async getMessages(): Promise<Message[]> {
        return await this.chatRepository.findAll<Message>();
    }

    async getMessagesByAuthor(authorName): Promise<Message[]> {
        return await this.chatRepository.findAll<Message>({
            where: {
                authorMessage: authorName
            }
        });
    }

    // tslint:disable-next-line:variable-name
    // async getUser(_id: number): Promise<User> {
    //     return await this.usersRepository.findOne({
    //         where: { id: _id },
    //     });
    // }

    // // tslint:disable-next-line:variable-name
    // async getUserByNickName(nickName: string): Promise<User> {
    //     const user = await this.usersRepository.findOne({
    //         where: { nickName: nickName },
    //     });
    //     return user;
    // }
    async createNewMessage(msg: any) {
        return await this.chatRepository.create(msg);
    }
    // tslint:disable-next-line:variable-name
    // async updateUser(_id: number, user: User) {
    //     return await this.usersRepository.update(user, {where: {id: _id}} );
    // }
    // // tslint:disable-next-line:variable-name
    // async deleteUser(_id: number) {
    //     return await  this.usersRepository.destroy({where: {id: _id}});
    // }
}