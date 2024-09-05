import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Create_userDto } from './dto/create_user.dto';
import { User } from '../models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly usersRepository: typeof User,
  ) {}

  async createUser(dto: Create_userDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { username: dto.username },
    });

    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }

    const user = await this.usersRepository.create(dto);
    return user;
  }
}
