import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *@description Function to get all users list
   * @returns
   */
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  /**
   * @description Function t0 get user by id
   * @param id
   * @returns
   */
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.userGetByAttribute({ id: id });
  }

  /**
   * @description Function to create user
   * @param userData
   * @returns
   */
  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  /**
   * @description Function to update user
   * @param id
   * @param userData
   * @returns
   */
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: id },
      data: userData,
    });
  }

  /**
   * @description Function to delete user
   * @param id
   * @returns
   */
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }
}
