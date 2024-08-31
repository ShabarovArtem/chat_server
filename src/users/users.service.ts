import { Injectable } from '@nestjs/common';
import {User} from "./users.model";
import { InjectModel } from '@nestjs/sequelize';
import { Create_userDto } from './dto/create_user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async createUser(dto: Create_userDto) {
    const user = await this.usersRepository.create(dto);
    return user;
  }
}
