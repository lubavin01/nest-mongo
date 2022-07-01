import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/env';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

export interface IJwtPayload {
  email: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }

    if (user.password !== password) {
      return null;
    }

    return user;
  }

  logIn(user: User): { access_token: string } {
    const payload: IJwtPayload = {
      email: user.email,
      sub: user.userId,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify<IJwtPayload>(token, {
      secret: JWT_SECRET,
    });

    const user = await this.userService.getUserByEmail(decoded.email);
    if (user.userId !== decoded.sub) {
      throw new Error('Unable to get user from JWT');
    }

    return user;
  }
}
