import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from '../models/chats.model';
import { User } from '../models/users.model';
import { UserChats } from '../models/user_chats.model';
import { Message } from '../models/messages.model';

@Module({
  imports: [SequelizeModule.forFeature([Chat, User, UserChats, Message])],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
