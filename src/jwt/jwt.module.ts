import { Module } from '@nestjs/common';
import { JWTService } from './jwt.service';

@Module({
  imports: [],
  controllers: [],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
