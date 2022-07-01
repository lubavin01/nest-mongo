import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from 'src/env';
import { IJwtPayload } from '../auth.service';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate({ email }: IJwtPayload): Promise<User | null> {
    return this.usersService.getUserByEmail(email);
  }
}
