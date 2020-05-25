import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

export interface Message extends Model<Message>{
  id: number;
  textMessage: string;
  authorMessage: string;
  timeMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table
export class Messages extends Model<Message> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  textMessage: string;

  @Column
  authorMessage: string;

  @Column
  colorAuthorName: string;

  @Column
  timeMessage: string;

  @Column
  createdAt: Date = new Date();

  @Column
  updatedAt: Date = new Date(); 
}
