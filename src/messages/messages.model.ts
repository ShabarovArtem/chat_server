import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Chat } from '../chats/chats.model';
import { User } from '../users/users.model';

@Table({ tableName: 'messages', updatedAt: false })
export class Message extends Model<Message> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => Chat)
  @Column({type: DataType.INTEGER, allowNull: false, field: 'chat'})
  chatId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false, field: 'author'})
  authorId: number;

  @Column({type: DataType.STRING, allowNull: false})
  text: string;

  @BelongsTo(() => Chat)
  chat: Chat;

  @BelongsTo(() => User)
  author: User;
}

