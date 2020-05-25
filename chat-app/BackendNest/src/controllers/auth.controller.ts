import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/users.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user).then(async (userData: any) => {
      if (userData === 'Baned') {
        return { status: 500, msg: 'You are baned' };
      }

      if (userData === 'Passwords mismatch') {
        return { status: 500, msg: 'Passwords mismatch' };
      }

      if (userData === '404') {
        let token;
        await this.authService.register(user);
        await this.authService.login(user).then(async (userData: User) => {
          token = await this.authService.generateTokenForUser(userData);
        });
        return Object.assign({ status: 200 }, token);
      }

      let token = await this.authService.generateTokenForUser(userData); 
      return Object.assign({ status: 200 }, token);
    });
  }
}
