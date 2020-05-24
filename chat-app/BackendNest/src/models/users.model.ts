import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsToMany } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
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
}
