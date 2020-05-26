import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService, VALIDATE_BANNED } from '../services/auth.service';
import { User } from '../models/users.model';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() userData: User, @Res() res: Response) {
    const user = await this.usersService.getUserByNickName(userData.nickName);

    if (!user){
      //this.chreateUser();
      return { status: 422, msg: 'User not exitst' };
    }

    const isTruePassword = await bcrypt.compare(userData.password, user.password);

    if (isTruePassword) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('Wrong password');
      //return { status: 422, msg: 'Wrong password' };
    }

    if (user.isBaned) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('Your are banned!');
     // return { status: 422, msg: 'Your are banned!' };
    }

    const token = await this.authService.generateTokenForUser(userData);

    return res.status(HttpStatus.OK).send({token});
    
    // ----
    const user2 = await  this.authService.login(user);

    if (!user2) {
      return { status: 500, msg: 'Error login' };
    }

    return this.authService.login(user).then(async (userData: any) => {
      if (userData === VALIDATE_BANNED) {
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

      const token = await this.authService.generateTokenForUser(userData);
      return Object.assign({ status: 200 }, token);
    });
  }
}
