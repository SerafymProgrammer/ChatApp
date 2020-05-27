import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import {Message} from '../interfaces/inrterfaces'

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
