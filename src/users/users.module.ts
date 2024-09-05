import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { Chat } from '../models/chats.model';
import { UserChats } from '../models/user_chats.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Chat, UserChats])],
})
export class UsersModule {}
