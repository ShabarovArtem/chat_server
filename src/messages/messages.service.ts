import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { Create_messageDto } from './dto/create_message.dto';
import { Chat } from '../chats/chats.model';
import { User } from '../users/users.model';
import { UserChats } from '../chats/user_chats.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private readonly messageRepository: typeof Message,
    @InjectModel(Chat) private readonly chatRepository: typeof Chat,
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(UserChats) private readonly userChatsRepository: typeof UserChats,
  ) {}

  async createMessage(dto: Create_messageDto): Promise<Message> {
    const chat = await this.chatRepository.findByPk(dto.chat);
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const author = await this.userRepository.findByPk(dto.author);
    if (!author) {
      throw new NotFoundException('User not found');
    }

    const userInChat = await this.userChatsRepository.findOne({
      where: {
        chatId: chat.id,
        userId: author.id,
      },
    });

    if (!userInChat) {
      console.log(`User with ID ${dto.author} is not a member of chat ${dto.chat}`);
      throw new ForbiddenException('User is not a member of the chat');
    }

    const message = await this.messageRepository.create({
      chatId: chat.id,
      authorId: author.id,
      text: dto.text,
    });

    return message;
  }

  async getMessagesByChat(chatId: number): Promise<Message[]> {
    const chat = await this.chatRepository.findByPk(chatId);
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const messages = await this.messageRepository.findAll({
      where: { chatId },
      order: [['createdAt', 'ASC']], // Сортировка по времени создания (от раннего к позднему)
    });

    if (messages.length === 0) {
      throw new NotFoundException('No messages found in this chat');
    }

    return messages;
  }
}
