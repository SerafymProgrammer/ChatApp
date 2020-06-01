import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Rooms } from './rooms.model';
import { Users } from './users.model';

@Table
export class Messages extends Model<Messages> {
  @PrimaryKey
  @AutoIncrement
  @Column
  messageId: number;

  @Column
  textMessage: string;

  @Column
  authorMessage: string;

  @Column
  colorAuthorName: string;

  @Column
  timeMessage: string;
  
  @ForeignKey(() => Rooms)
  @Column
  roomId: number;

  @BelongsTo(() => Rooms)
  room: Rooms;

  @ForeignKey(() => Users)
  @Column
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @Column
  createdAt: Date = new Date();

  @Column
  updatedAt: Date = new Date();
}
