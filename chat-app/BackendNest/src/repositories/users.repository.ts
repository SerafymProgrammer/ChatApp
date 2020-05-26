import { Injectable, Inject } from '@nestjs/common';
import { Users } from '../models/users.model';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
  ) {}

  public getUsers(): Promise<Users[]> {
    return this.usersRepository.findAll<Users>();
  }

  getUser(_id: number): Promise<Users> {
    return  this.usersRepository.findOne({
      where: { id: _id },
    });
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
    return await this.usersRepository.create({id: null, ...user});
  }

  async updateUser(_id: number, fieldsUpdated) {
    return await this.usersRepository.update(fieldsUpdated, {
      returning: true,
      where: { id: _id },
    });
  }
}
