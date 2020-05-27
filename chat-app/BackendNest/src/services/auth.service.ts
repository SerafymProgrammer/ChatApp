import { Injectable } from '@nestjs/common';
import { Users } from '../models/users.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

export const VALIDATE_BANNED = 'Baned';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public generateTokenForUser(userData: Users) {
    return this.jwtService.sign(JSON.stringify(userData));
  }
}
