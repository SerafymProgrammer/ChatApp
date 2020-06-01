import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Messages } from './message.model';
import { Users } from './users.model';
import { RoomsUsers } from './RoomsUsers.model';

@Table
export class Rooms extends Model<Rooms> {
  @PrimaryKey
  @AutoIncrement
  @Column
  roomId: number;

  @Column
  roomName: string; 

  @HasMany(() => Messages)
  messages: Messages[];

  @BelongsToMany(() => Users, () => RoomsUsers)
  users: Users[];

  @Column
  createdAt: Date = new Date();

  @Column
  updatedAt: Date = new Date();
}
