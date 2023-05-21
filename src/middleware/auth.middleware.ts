import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { JWTService } from 'src/jwt/jwt.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JWTService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('authorization' in req.headers === false) {
      return next('Authorization header missing');
    }

    const authToken = req.headers['authorization'];
    const decodedToken = await this.jwtService.decode(authToken);
    const user: User = await this.userService.getUserByUuid(
      decodedToken['uuid'],
    );

    if (!user) {
      return next('User not found');
    }

    req['user'] = user;
    next();
  }
}
