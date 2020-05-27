import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/inrterfaces';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersService } from '../services/users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() userData: User, @Res() res: Response) {
    const user = await this.usersService.getUserByNickName(userData.nickName);

    if (!user){
      await this.usersService.createUser(userData);
      const newUser = await this.usersService.getUserByNickName(userData.nickName);
      const token = await this.authService.generateTokenForUser(newUser);
      const {isAdmin, nickNameColor} = newUser;
      return res.status(HttpStatus.OK).send({token, isAdmin, nickNameColor});
    }

    const isTruePassword = await bcrypt.compare(userData.password, user.password);

    if (isTruePassword) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('Wrong password');
    }

    if (user.isBaned) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('Your are banned!');
    }

    const token = await this.authService.generateTokenForUser(userData);

    return res.status(HttpStatus.OK).send({token});
    
  }
}
