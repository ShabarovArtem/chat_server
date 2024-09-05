import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Create_messageDto } from './dto/create_message.dto';
import { Get_messageDto } from './dto/get_message';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('add')
  async createMessage(@Body() createMessageDto: Create_messageDto) {
    return await this.messagesService.createMessage(createMessageDto);
  }

  @Post('get')
  async getMessages(@Body() getMessageDto: Get_messageDto) {
    return await this.messagesService.getMessagesByChat(getMessageDto);
  }
}
