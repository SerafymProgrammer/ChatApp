import { Injectable } from '@nestjs/common';
import { User } from '../models/users.model';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private saltRounds = 10;
  constructor(private usersRepository: UsersRepository) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.getUsers();
  }

  getUser(_id: number): Promise<User> {
    return this.usersRepository.getUser(_id);
  }

  getUserByNickName(nickName: string): Promise<User> {
    return this.usersRepository.getUserByNickName(nickName);
  }

  getUsersByOnlineStatus(status: any): Promise<User[]> {
    return this.usersRepository.getUsersByOnlineStatus(status);
  }

  async createUser(user: User) {
    const newPassword =  await bcrypt.hash(user.password, this.saltRounds);
    //const newUser = {...user}; //Object.assign({}, user);
    return this.usersRepository.createUser({
      ...user, 
      id: null,
      password: newPassword
    });
  }

  async updateUser(_id: number, fiedsUpdated) {
    return await this.usersRepository.updateUser(_id, fiedsUpdated);
  }
}
