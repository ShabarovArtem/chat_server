import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './users.model';
import { UserChats } from './user_chats.model';
import { Message } from './messages.model';

@Table({ tableName: 'chats', updatedAt: false })
export class Chat extends Model<Chat> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => User, () => UserChats)
  users: User[];

  @HasMany(() => Message)
  messages: Message[];
}
