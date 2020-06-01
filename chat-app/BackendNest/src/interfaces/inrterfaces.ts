import { Model } from 'sequelize-typescript';
import { Socket } from 'socket.io';
import { Users } from '../models/users.model';

export interface ClientWebSocket extends Socket {
  user?: Users;
}

export interface Message extends Model<Message> {
  messageId: number;
  textMessage: string;
  timeMessage: string;
  createdAt: Date;
  updatedAt: Date;
  authorMessage: User;
  room: Room;
  
}

export interface User extends Model<User> {
  userId: number;
  nickName: string;
  password: string;
  nickNameColor: string;
  isAdmin: boolean;
  onlineStatus: boolean;
  isMuted: boolean;
  isBaned: boolean;
  rooms: Room[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Room extends Model<Room> {
  roomId: number;
  messages: Message[];
  users: User[];
  createdAt: Date;
  updatedAt: Date;
}