import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Create_messageDto } from './dto/create_message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {
  }

  @Post('add')
  async createMessage(@Body() createMessageDto: Create_messageDto) {
    return await this.messagesService.createMessage(createMessageDto);
  }


  @Post('get')
  async getMessages(@Body() body: { chat: number }) {
    const messages = await this.messagesService.getMessagesByChat(body.chat);
    return messages;
  }
}




