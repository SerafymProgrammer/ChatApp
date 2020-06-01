import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, BelongsToMany } from 'sequelize-typescript';
import { User } from '../interfaces/inrterfaces';
import { Messages } from './message.model';
import { Rooms } from './rooms.model';
import { RoomsUsers } from './RoomsUsers.model';


@Table
export class Users extends Model<Users> {
  @PrimaryKey
  @AutoIncrement
  @Column
  userId: number;

  @Column
  nickName: string;

  @Column
  password: string;

  @Column
  nickNameColor: string;

  @Column
  isAdmin: boolean;

  @Column
  onlineStatus: boolean;

  @Column
  isMuted: boolean;

  @Column
  isBaned: boolean; 
   
  @BelongsToMany(() => Rooms, () => RoomsUsers)
  authors: Rooms[];

  @HasMany(() => Messages)
  messages: Messages[];
  
  @Column
  createdAt: Date = new Date();

  @Column
  updatedAt: Date = new Date(); 
}
