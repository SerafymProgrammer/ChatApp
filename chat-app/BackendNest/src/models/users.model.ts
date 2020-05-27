import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from '../interfaces/inrterfaces';

@Table
export class Users extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

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
  
  @Column
  createdAt: Date = new Date();

  @Column
  updatedAt: Date = new Date(); 
}
