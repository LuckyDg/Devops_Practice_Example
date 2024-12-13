import { Body, Controller, CustomDecorator, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { AUTH_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    return this.client.send({cmd: 'auth.register.user'}, registerDto).pipe(
      catchError((err) => {
         throw new RpcException(err);
      })
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.client.send({cmd: 'auth.login.user'}, loginDto).pipe(
      catchError((err) => {
         throw new RpcException(err);
      })
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verify(@User() user: CustomDecorator , @Token() token: string) {
    return { user, token };
  }
}

