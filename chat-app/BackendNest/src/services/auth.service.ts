import { Injectable } from '@nestjs/common';
import { User } from '../models/users.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import jwtDecode = require('jwt-decode');

export const VALIDATE_BANNED = 'Baned';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(userData: User): Promise<any> {
    // try {
      const { nickName } = userData;
      const user = await this.usersService.getUserByNickName(nickName);

      if(!user || user.isBaned) {
        return false; //'404';
        // throw new Error('404');
      }
      if (user.isBaned) {
        return VALIDATE_BANNED;
        //throw new Error('Baned');
      }

      const isTruePassword = await bcrypt.compare(userData.password, user.password);

      if (!isTruePassword) {
        return false; ///'Passwords mismatch';
        //throw new Error('Passwords mismatch');
      }

      return user;
    // } catch (e) {
      // return e.message;
    // }
  }

  public async generateTokenForUser(userData: User) {
    // const accessToken = {
    //   userToken: this.jwtService.sign(JSON.stringify(userData)),
    // };
    return this.jwtService.sign(JSON.stringify(userData));
  }

  public async validateUserByToken(token) {
    try {
      const decodedUser = jwtDecode(token);
      if (!decodedUser) {
        throw new Error('Token is not valid');
      }
      return await decodedUser;
    } catch (e) {
      return e.message;
    }
  }

  public async login(user: User) {
    return this.validateUser(user);
  }

  public async register(user: User): Promise<any> {
    return this.usersService.createUser(user);
  }
}
