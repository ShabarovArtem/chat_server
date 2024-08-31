import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { Create_messageDto } from './dto/create_message.dto';
import { Chat } from '../chats/chats.model';
import { User } from '../users/users.model';

@Injectable()
export class MessagesService {

  constructor(
    @InjectModel(Message) private readonly messageRepository: typeof Message,
    @InjectModel(Chat) private readonly chatRepository: typeof Chat,
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async createMessage(dto: Create_messageDto): Promise<Message> {
    // Находим объекты Chat и User по их ID
    const chat = await this.chatRepository.findByPk(dto.chat);
    const author = await this.userRepository.findByPk(dto.author);

    // Если один из них не найден, можно выбросить ошибку
    if (!chat || !author) {
      throw new Error('Chat or User not found');
    }

    // Создаем сообщение
    const message = await this.messageRepository.create({
      chatId: chat.id,
      authorId: author.id,
      text: dto.text,
    });

    return message;
  }

  // Метод для получения списка сообщений по идентификатору чата
  async getMessagesByChat(chat: number): Promise<Message[]> {
    const message = await this.messageRepository.findAll({
      where: { chat }, // Условие для фильтрации по chat
      order: [['createdAt', 'ASC']], // Сортировка по времени создания (от раннего к позднему)
    });
    return message;
  }
}
