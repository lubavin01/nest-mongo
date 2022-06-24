import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(
    email: string,
    age: number,
    favouriteFoods: string[],
  ): Promise<User> {
    return this.usersRepository.create({
      userId: uuidv4(),
      email,
      age,
      favouriteFoods,
    });
  }

  async updateUser(userId: string, data: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, data);
  }
}
