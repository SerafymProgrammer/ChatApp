import {
    Table,
    Column,
    Model,
    ForeignKey,
  } from 'sequelize-typescript';
  import { Rooms } from './rooms.model';
  import { Users } from './users.model';

@Table
export class RoomsUsers extends Model<RoomsUsers> {

  @ForeignKey(() => Rooms)
  @Column
  roomId: number;

  @ForeignKey(() => Users)
  @Column
  userId: number;
}