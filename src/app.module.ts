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
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User,Chat, UserChats, Message],
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

