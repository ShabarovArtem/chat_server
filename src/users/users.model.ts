import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Chat } from '../chats/chats.model';
import { UserChats } from '../chats/user_chats.model';

interface UserCreationAttrs {
  username: string;
}

@Table({ tableName: 'users', updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  username: string;
  @BelongsToMany(() => Chat, () => UserChats)
  chats: Chat[];
}