import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const foundUser = await this.usersService.getUser(user.email);

    if (!foundUser) {
      throw new NotAcceptableException('User doesnt exist');
    }

    const payload = { email: user.email, id: foundUser.id };
    const passwordValid = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Password invalid');
    }

    if (user && passwordValid) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
