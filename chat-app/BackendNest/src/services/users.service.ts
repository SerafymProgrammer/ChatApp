import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/users.model';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private saltRounds = 10;
  constructor(private usersRepository: UsersRepository) {}

  getUsers(): Promise<User[]> {
    return  this.usersRepository.getUsers();
  }

  // tslint:disable-next-line:variable-name
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
    //  tslint:disable-next-line:variable-name
    const { nickName } = user;
    const userWithThisNickName =await this.usersRepository.getUserByNickName(nickName);

    if (userWithThisNickName) {
      alert('Nickname existed');
      return;
    }
    user.password = await bcrypt.hash(user.password, this.saltRounds);
    return this.usersRepository.createUser(user);
  }

  // tslint:disable-next-line:variable-name
   async updateUser(_id: number, fiedsUpdated) {
    
    return await this.usersRepository.updateUser(_id, fiedsUpdated);
  }

  // tslint:disable-next-line:variable-name
  deleteUser(_id: number) {
    this.usersRepository.deleteUser(_id);
  }
}
