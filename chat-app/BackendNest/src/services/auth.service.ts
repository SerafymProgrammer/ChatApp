import { Injectable } from '@nestjs/common';
import { Users } from '../models/users.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private saltRounds = 10;

  constructor(private readonly jwtService: JwtService) {}

  public validateNickName(nickName) {
    if (/[^A-zА-яЁё0-9]/.test(nickName) || nickName.length < 3) {
      return false;
    }
    return true;
  }

  public generateTokenForUser(userData: Users) {
    return this.jwtService.sign(JSON.stringify(userData));
  }

  public hashPassword(password: string) {
    return bcrypt.hash(password, this.saltRounds);
  }
}
