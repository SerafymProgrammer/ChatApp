import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rooms } from '../models/rooms.model';
import { RoomsService } from '../services/rooms.service';

@Module({
  imports: [SequelizeModule.forFeature([Rooms])],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}