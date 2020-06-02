import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomsUsers } from '../models/RoomsUsers.model';
import { RoomsService } from '../services/rooms.service';
import { RoomsUsersService } from '../services/roomsUsers.service';

@Module({
  imports: [SequelizeModule.forFeature([RoomsUsers])],
  providers: [RoomsUsersService],
  exports: [RoomsUsersService],
})
export class RoomsUsersModule {}