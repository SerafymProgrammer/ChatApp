import { Injectable } from '@nestjs/common';
import { Rooms } from '../models/rooms.model';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../models/users.model';
import { Messages } from '../models/message.model';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Rooms) private roomModel: typeof Rooms) {}

  public getRooms(): Promise<Rooms[]> {
    return this.roomModel.findAll<Rooms>();
  }

  public getRoomByNameByUsers(roomName: string,): Promise<Rooms> {
    return this.roomModel.findOne<Rooms>({
      where: {
        roomName,
      },
      include: [Users]
    });
  }

  public getRoomByNameByMessages(roomName: string, id: number): Promise<Rooms> {
    return this.roomModel.findOne<Rooms>({
      where: {
        roomName,
      },
      include: [{model: Messages, where: {userId: id}}]
    });
  }

  public createNewRoom(roomName: string) {
    return this.roomModel.create({roomName});
  }
}
