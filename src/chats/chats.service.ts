import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { UserChats } from './user_chats.model';
import { Create_chatDto } from './dto/create_chat.dto';
import { Message } from '../messages/messages.model';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat) private readonly chatRepository: typeof Chat,
    @InjectModel(UserChats) private readonly userChatsRepository: typeof UserChats,
    @InjectModel(Message) private readonly messageRepository: typeof Message,
  ) {}

  async createChat(dto: Create_chatDto): Promise<Chat> {
    // Создание нового чата
    const chat = await this.chatRepository.create({ name: dto.name });

    // Добавление пользователей в чат через промежуточную таблицу
    if (dto.users && dto.users.length > 0) {
      const userChats = dto.users.map(userId => ({
        chatId: chat.id,
        userId,
      }));
      await this.userChatsRepository.bulkCreate(userChats);
    }

    return chat;
  }

  async getChatsByUser(userId: number): Promise<Chat[]> {
    // Находим все связи пользователя с чатами в таблице user_chats
    const userChats = await this.userChatsRepository.findAll({
      where: { userId },
      attributes: ['chatId'], // Извлекаем только chatId
    });

    // Извлекаем chatId из результата
    const chatIds = userChats.map(userChat => userChat.chatId);

    if (chatIds.length === 0) {
      return []; // Если пользователь не состоит ни в одном чате, возвращаем пустой массив
    }

    // Находим все чаты, в которых состоит пользователь
    const chats = await this.chatRepository.findAll({
      where: {
        id: chatIds, // Фильтрация чатов по chatId
      },
      include: [
        {
          model: Message,
          required: false, // Включаем связанные сообщения (может быть пустым, если сообщений нет)
        },
      ],
    });

    // Сортируем чаты по времени создания последнего сообщения
    chats.sort((a, b) => {
      const latestMessageA = a.messages?.reduce((latest, msg) =>
          msg.createdAt > latest.createdAt ? msg : latest,
        a.messages?.[0]
      );
      const latestMessageB = b.messages?.reduce((latest, msg) =>
          msg.createdAt > latest.createdAt ? msg : latest,
        b.messages?.[0]
      );

      return (latestMessageB?.createdAt ?? new Date(0)).getTime() - (latestMessageA?.createdAt ?? new Date(0)).getTime();
    });

    return chats;
  }
}

