import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Create_userDto } from './dto/create_user.dto';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post('add')
  create(@Body() userDto: Create_userDto) {
    return this.usersService.createUser(userDto);
  }

}
