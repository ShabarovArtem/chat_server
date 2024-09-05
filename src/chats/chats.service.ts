import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Chat } from '../models/chats.model';
import { UserChats } from '../models/user_chats.model';
import { Create_chatDto } from './dto/create_chat.dto';
import { Message } from '../models/messages.model';
import { User } from '../models/users.model';
import { Sequelize } from 'sequelize';
import { isEqual } from 'lodash';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat) private readonly chatRepository: typeof Chat,
    @InjectModel(UserChats)
    private readonly userChatsRepository: typeof UserChats,
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectConnection() private readonly sequelize: Sequelize,
  ) {}

  async createChat(dto: Create_chatDto): Promise<Chat> {
    const users = await this.userRepository.findAll({
      where: { id: dto.users },
    });

    if (users.length !== dto.users.length) {
      throw new NotFoundException('One or more users not found');
    }

    const existingChats = await this.chatRepository.findAll({
      where: { name: dto.name },
      include: [
        {
          model: User,
          through: { attributes: [] },
        },
      ],
    });

    for (const chat of existingChats) {
      const chatUserIds = chat.users.map((user) => user.id).sort();
      const dtoUserIds = dto.users.sort();

      if (isEqual(chatUserIds, dtoUserIds)) {
        throw new ConflictException(
          'Chat with this name and users already exists',
        );
      }
    }

    const chat = await this.chatRepository.create({ name: dto.name });

    const userChats = dto.users.map((userId) => ({
      chatId: chat.id,
      userId,
    }));
    await this.userChatsRepository.bulkCreate(userChats);

    return chat;
  }

  async getChatsByUser(userId: number): Promise<Chat[]> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userChats = await this.userChatsRepository.findAll({
      where: { userId },
      attributes: ['chatId'],
    });

    if (userChats.length === 0) {
      throw new NotFoundException('This user has no chats');
    }

    const chatIds = userChats.map((userChat) => userChat.chatId);

    const chats = await this.chatRepository.findAll({
      where: {
        id: chatIds,
      },
      include: [
        {
          model: Message,
          required: false,
        },
      ],
      order: [
        [
          this.sequelize.literal(
            `(SELECT MAX("messages"."createdAt") FROM "messages" WHERE "messages"."chat" = "Chat"."id")`,
          ),
          'DESC',
        ],
      ],
    });

    return chats;
  }
}
