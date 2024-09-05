import { Body, Controller, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Create_chatDto } from './dto/create_chat.dto';
import { Get_ChatDto } from './dto/get_chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('add')
  async createChat(@Body() dto: Create_chatDto) {
    const chat = await this.chatsService.createChat(dto);
    return { id: chat.id };
  }

  @Post('get')
  async getChatsByUser(@Body() dto: Get_ChatDto) {
    const chats = await this.chatsService.getChatsByUser(dto.user);
    return chats;
  }
}
