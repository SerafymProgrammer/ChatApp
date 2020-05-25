import { Injectable, Inject } from '@nestjs/common';
import { Users } from '../models/users.model';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
  ) {}

  async getUsers(): Promise<Users[]> {
    return await this.usersRepository.findAll<Users>();
  }

  async getUser(_id: number): Promise<Users> {
    try {
      return await this.usersRepository.findOne({
        where: { id: _id },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getUserByNickName(nickName: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { nickName },
    });
    return user;
  }

  async getUsersByOnlineStatus(status: any): Promise<Users[]> {
    const users = await this.usersRepository.findAll({
      where: { onlineStatus: status },
    });
    return users;
  }

  async createUser(user: Users) {
    return await this.usersRepository.create(user);
  }

  async updateUser(_id: number, fieldsUpdated) {
    try {
      return await this.usersRepository.update(fieldsUpdated, {
        returning: true,
        where: { id: _id },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
