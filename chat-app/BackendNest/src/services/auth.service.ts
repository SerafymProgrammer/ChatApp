import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/users.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import jwtDecode = require('jwt-decode');

// decoded = jwt_decode(token)

@Injectable()
export class AuthService {
  public  async comparePasswords(passwordLogin, passwordReally): Promise<boolean> {
        return bcrypt.compare(passwordLogin, passwordReally);
      }

  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService) {}

    private async validate(userData: User): Promise<User> {
        const {nickName } = userData;
        const user = await this.usersService.getUserByNickName(nickName);
        
        return user;
    }

    public async generateTokenForUser(userData: User) {
        const {id, nickName, password, isAdmin, onlineStatus, isBaned, isMuted} = userData;
        const payload = userData;
        const accessToken = { userToken: this.jwtService.sign(JSON.stringify(payload)) };
        return accessToken;
    }
    public async validateUserByToken(token) {
        try{
        const decodedUser = jwtDecode(token);
        if(!decodedUser) {
            return new Error('Token is not valid')
        }
        return await decodedUser;
        } catch (e) {
            console.log(e);
        }
    }

    public async login(user: User) {
            return this.validate(user);
    }

    public async register(user: User): Promise<any> {
        // tslint:disable-next-line:no-console
        console.log(user);
        return this.usersService.createUser(user);
    }

}
