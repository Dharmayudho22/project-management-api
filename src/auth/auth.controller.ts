import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto): Promise<{
    message: string;
    userId: number;
  }> {
    return this.authService.register(dto.email, dto.password) as Promise<{
      message: string;
      userId: number;
    }>;
  }

  @Post('login')
  login(@Body() dto: AuthDto): Promise<{ access_token: string }> {
    return this.authService.login(dto.email, dto.password);
  }
}
