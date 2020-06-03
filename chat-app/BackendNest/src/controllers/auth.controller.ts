import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Users } from '../models/users.model';
import { Response } from 'express';
import { UsersService } from '../services/users.service';
import * as bcrypt from 'bcrypt';
import * as constants from '../constants/constants';
import { RoomsUsersService } from '../services/roomsUsers.service';
import { Rooms } from '../models/rooms.model';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private roomsUsersService: RoomsUsersService,
  ) {}

  @Post('login')
  async login(@Body() userData: Users, @Res() res: Response) {
    
    const user = await this.usersService.getUserByThat({where: {nickName: userData.nickName}, include: [Rooms] });

    if (!user) {
      if (!this.authService.validateNickName(userData.nickName)) {
        return res
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .send(constants.ERROR_NICKNAME_VALIDATE);
      }
      userData.password = await this.authService.hashPassword(
        userData.password,
      );
      const newUser = await this.usersService.createUser(userData);
      await this.roomsUsersService.createRoomUser(
        constants.ID_DEFAULT_ROOM, 
        newUser.userId,
      );
      return this.sendOk(newUser, res);
    }

    const isTruePassword = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!isTruePassword) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(constants.ERROR_PASSWORD);
    }

    if (user.isBaned) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(constants.USER_BANNED);
    }

    return this.sendOk(user, res);
  }

  async sendOk(userData, res) {
    const { isAdmin, nickNameColor, nickName } = userData;
    const token = await this.authService.generateTokenForUser(userData);

    return res
      .status(HttpStatus.OK)
      .send({ token, isAdmin, nickNameColor, nickName });
  }
}
