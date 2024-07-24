import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { createCustomError } from '../../common/utils/helpers';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User service');

  /**
   * @description Function to get user by attribute
   * @param userGetByAttribute
   * @returns
   */
  async userGetByAttribute(
    userGetByAttribute: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    try {
      this.logger.log('userById');
      const user = await this.prisma.user.findUnique({
        where: userGetByAttribute,
      });
      return user;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description Function to get users list
   * @returns
   */
  async getAllUsers() {
    try {
      this.logger.log('getAllUsers');
      const users = await this.prisma.user.findMany();
      return users;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description Function to create new user
   * @param data
   * @returns
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      this.logger.log('createUser');
      const createUser = await this.prisma.user.create({
        data,
      });
      return createUser;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description Function to update user
   * @param params
   * @returns
   */
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    try {
      this.logger.log('updateUser');
      const updateUser = await this.prisma.user.update({
        where: params.where,
        data: params.data,
      });
      return updateUser;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description Function to delete user
   * @param where
   * @returns
   */
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      this.logger.log('deleteUser');
      const deleteUser = await this.prisma.user.delete({
        where,
      });
      return deleteUser;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
