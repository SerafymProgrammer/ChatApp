import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

export interface User extends Model<User>{
  id: number;
  nickName: string;
  password: string;
  nickNameColor: string;
  isAdmin: boolean;
  onlineStatus: boolean;
  isMuted: boolean;
  isBaned: boolean;  
  createdAt: Date;
  updatedAt: Date;
}


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
