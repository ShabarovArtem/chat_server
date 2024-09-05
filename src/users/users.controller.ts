import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Create_userDto } from './dto/create_user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  async createUser(@Body() createUserDto: Create_userDto) {
    return this.usersService.createUser(createUserDto);
  }
}
