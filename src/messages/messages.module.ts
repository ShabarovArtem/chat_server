import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Chat } from '../chats/chats.model';
import { UserChats } from '../chats/user_chats.model';
import { Message } from './messages.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Message, Chat, User, UserChats]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [SequelizeModule], // Экспортируем для использования в других модулях
})
export class MessagesModule {}
