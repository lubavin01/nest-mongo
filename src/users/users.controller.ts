import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { email, age, favouriteFoods } = createUserDto;
    return this.usersService.createUser(email, age, favouriteFoods);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }
}
