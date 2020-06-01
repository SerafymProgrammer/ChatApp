import { Injectable } from '@nestjs/common';
import { RoomsUsers } from '../models/RoomsUsers.model';
import { InjectModel } from '@nestjs/sequelize';
import { randomColor } from 'randomcolor';
import { colorsHues } from '../constants/constants';
import { getRandomInt } from '../helpers/helpers';

@Injectable()
export class RoomsUsersService {
constructor(
    @InjectModel(RoomsUsers)
    private roomsUsers: typeof RoomsUsers,
  ) {}

//   public getUsers(): Promise<Users[]> {
//     return this.userModel.findAll();
//   }

  public getRoomUser(roomId: number, userId: number): Promise<RoomsUsers> {
    return this.roomsUsers.findOne({
      where: { roomId, userId },
    });
  }

//   public getUserByNickName(nickName: string): Promise<Users> {
//     return this.userModel.findOne({
//       where: { nickName },
//     });
//   }

  public createRoomUser(roomId: number, userId: number) {
    return this.roomsUsers.create({ roomId, userId });
  }

//   public updateUser(id: number, fieldsUpdated: {}) {
//     return this.userModel.update(fieldsUpdated, {
//       returning: true,
//       where: { id },
//     });
//   }

}