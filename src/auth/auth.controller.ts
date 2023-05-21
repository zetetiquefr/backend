import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ValidUserDto } from './dto/validUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async logIn(@Body() login: LoginDto) {
    return await this.authService.logIn(login.email, login.password);
  }

  @Post('/user/valid')
  async validUsertoken(@Body() token: ValidUserDto) {
    return await this.authService.validUserToken(token.token);
  }

  @Post('/access/admin_panel')
  async haveAccessToAdminPanel(@Body() token: ValidUserDto) {
    return await this.authService.haveAccessToAdminPanel(token.token);
  }
}
