import { Injectable } from '@nestjs/common';
import { User } from '../models/users.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import jwtDecode = require('jwt-decode');

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async comparePasswords(
    passwordLogin,
    passwordReally,
  ): Promise<boolean> {
    return bcrypt.compare(passwordLogin, passwordReally);
  }

  private async validateUser(userData: User): Promise<any> {
    try {
      const { nickName } = userData;
      const user = await this.usersService.getUserByNickName(nickName);

      if(!user) {
        throw new Error('404');
      }
      if (user.isBaned) {
        throw new Error('Baned');
      }

      const isTruePassword = this.comparePasswords(userData.password, user.password)
      if (!isTruePassword) {
        throw new Error('Passwords mismatch');
      }
      return user;
    } catch (e) {
      return e.message;
    }
  }

  public async generateTokenForUser(userData: User) {
    const accessToken = {
      userToken: this.jwtService.sign(JSON.stringify(userData)),
    };
    return accessToken;
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
