import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Chat } from './chats.model';
import { User } from '../users/users.model';

@Table({ tableName: 'user_chats', updatedAt: false })
export class UserChats extends Model<UserChats> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;

  @ForeignKey(() => Chat)
  @Column({type: DataType.INTEGER, allowNull: false})
  chatId: number;

}