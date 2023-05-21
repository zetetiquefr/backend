import { Injectable } from '@nestjs/common';
import { JWTService } from 'src/jwt/jwt.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { RoleEnum } from 'src/role/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JWTService,
  ) {}

  async createToken(user: User) {
    return await this.jwtService.sign(user);
  }

  async logIn(email: string, password: string): Promise<any> {
    const user: User = await this.usersService.getUserByEmail(email);

    if (user) {
      if (this.usersService.comparePassword(password, user)) {
        const data = { ...user, password: undefined };

        return {
          message: 'User logged in successfully',
          token: await this.createToken(data),
        };
      }
      return {
        message: 'Password does not match',
      };
    }
    return {
      message: 'User not found',
    };
  }

  async validUserToken(token: string): Promise<any> {
    const user: User = await this.jwtService.decode(token);

    if (!user) {
      throw new Error('Invalid token');
    }

    const fetchedUser: User = await this.usersService.getUserByUuid(user.uuid);

    if (!fetchedUser) {
      throw new Error('Invalid token');
    }
    return {
      message: 'Valid token',
    };
  }

  async haveAccessToAdminPanel(token: string): Promise<any> {
    const user: User = await this.jwtService.decode(token);

    if (!user) {
      throw new Error('Invalid token');
    }

    const fetchedUser: User = await this.usersService.getUserByUuid(user.uuid);

    if (!fetchedUser) {
      throw new Error('Invalid token');
    }

    if (
      fetchedUser.roles.find(
        (role) =>
          role.name === RoleEnum.ADMIN || role.name === RoleEnum.SUPER_ADMIN,
      )
    ) {
      return {
        message: 'Access granted',
      };
    }
    throw new Error('Access denied');
  }
}
