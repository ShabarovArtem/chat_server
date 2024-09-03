import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { User } from './users/users.model';
import { ChatsModule } from './chats/chats.module';
import { Chat } from './chats/chats.model';
import { UserChats } from './chats/user_chats.model';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/messages.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS,
      database: process.env.DB_NAME || 'postgres',
      models: [User, Chat, UserChats, Message],
      autoLoadModels: true,
      synchronize: true
    }),
    UsersModule,
    ChatsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
