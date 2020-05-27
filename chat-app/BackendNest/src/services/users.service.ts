import { Injectable } from '@nestjs/common';
import { Users } from '../models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { randomColor } from 'randomcolor';
import { colorsHues } from '../constants/constants';
import { getRandomInt } from '../helpers/helpers';

@Injectable()
export class UsersService {
  private saltRounds = 10;
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  public getUsers(): Promise<Users[]> {
    return this.userModel.findAll();
  }

  public getUser(_id: number): Promise<Users> {
    return this.userModel.findOne({
      where: { id: _id },
    });
  }

  public getUserByNickName(nickName: string): Promise<Users> {
    return this.userModel.findOne({
      where: { nickName },
    });
  }

  public createUser(user: Users) {
    return this.userModel.create({
      id: null,
      ...user,
      nickNameColor: randomColor({
        luminosity: 'dark',
        hue: colorsHues[getRandomInt(0, 5)],
      }),
    });
  }

  public updateUser(_id: number, fieldsUpdated: {}) {
    return this.userModel.update(fieldsUpdated, {
      returning: true,
      where: { id: _id },
    });
  }
}
