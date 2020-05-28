import { Model } from 'sequelize-typescript';
import { Socket } from 'socket.io';
import { Users } from '../models/users.model';

export interface ClientWebSocket extends Socket {
  user?: Users;
}

export interface Message extends Model<Message> {
  id: number;
  textMessage: string;
  authorMessage: string;
  timeMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends Model<User> {
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
