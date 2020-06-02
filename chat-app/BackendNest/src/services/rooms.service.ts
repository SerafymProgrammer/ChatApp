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

  public getRoomByThat(byThat: {}): Promise<Rooms> {
    return this.roomModel.findOne<Rooms>(byThat);
  }

  public createNewRoom(roomName: string) {
    return this.roomModel.create({roomName});
  }
}
