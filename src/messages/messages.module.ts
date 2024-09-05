import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { Chat } from '../models/chats.model';
import { UserChats } from '../models/user_chats.model';
import { Message } from '../models/messages.model';

@Module({
  imports: [SequelizeModule.forFeature([Message, Chat, User, UserChats])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [SequelizeModule],
})
export class MessagesModule {}
