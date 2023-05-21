import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWTService {
  async sign(payload: any): Promise<string> {
    return jwt.sign(payload, 'jwtSecret', { expiresIn: '60m' });
  }

  async decode(token: string): Promise<any> {
    return jwt.decode(token);
  }
}
