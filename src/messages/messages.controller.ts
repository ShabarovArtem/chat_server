import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Create_messageDto } from './dto/create_message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('add')
  async addMessage(@Body() createMessageDto: Create_messageDto) {
    try {
      const message = await this.messagesService.createMessage(createMessageDto);
      return { id: message.id };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not create message',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('get')
  async getMessages(@Body() body: { chat: number }) {
    try {
      const messages = await this.messagesService.getMessagesByChat(body.chat);
      return messages;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not retrieve messages',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}



