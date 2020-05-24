import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/users.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
                private jwtService: JwtService) { }

    @Post('login')
    async login(@Body() user: User) {
        return this.authService.login(user).then(async (userData: User) => {
            if (!userData) {
                let token;
                await this.authService.register(user);
                await this.authService.login(user).then(async (userData: User) => {
                    token = this.authService.generateTokenForUser(userData);
                })
                return token;
            }
            const isTruePassword = await bcrypt.compare(user.password, userData.password);
            if (!isTruePassword) {
                return;
            }
            return this.authService.generateTokenForUser(userData);
        });
    }

    @Post('register')
    async register(@Body() user: User): Promise<any> {
        return this.authService.register(user);
    }
}
