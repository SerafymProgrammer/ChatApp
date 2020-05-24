import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsToMany } from 'sequelize-typescript';

@Table
export class Message extends Model<Message> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  textMessage: string;

  @Column
  authorMessage: string;

  @Column
  timeMessage: string;
}
