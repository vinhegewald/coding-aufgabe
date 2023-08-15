import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
  async getUser(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async getUserByID(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async updatePassword(id: string, new_password: string): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: new_password,
      },
    });
  }

  async updateEmail(id: string, email: string): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });
  }
}
