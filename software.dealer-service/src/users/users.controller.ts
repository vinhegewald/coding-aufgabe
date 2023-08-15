import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  BadRequestException,
  ConflictException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/email')
  async updateEmail(
    @Body('id') id: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<User> {
    if (!password || !id || !email) {
      throw new BadRequestException('Missing fields');
    }

    const user = await this.usersService.getUserByID(id);

    if (!user) {
      throw new NotAcceptableException('User doesnt exist');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Wrong password provided');
    }

    return this.usersService.updateEmail(id, email);
  }

  @Post('/password')
  async updatePassword(
    @Body('id') id: string,
    @Body('new_password') new_password: string,
    @Body('old_password') old_password: string,
  ): Promise<User> {
    if (!new_password || !id || !old_password) {
      throw new BadRequestException('Missing fields');
    }

    const user = await this.usersService.getUserByID(id);

    if (!user) {
      throw new NotAcceptableException('User doesnt exist');
    }

    const passwordValid = await bcrypt.compare(old_password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Wrong password provided');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(new_password, saltOrRounds);

    return this.usersService.updatePassword(id, hashedPassword);
  }

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<User> {
    if (!password || !email) {
      throw new BadRequestException('Email or password required');
    }

    if (await this.usersService.getUser(email)) {
      throw new ConflictException('User already exists');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(email, hashedPassword);
    return result;
  }
}
