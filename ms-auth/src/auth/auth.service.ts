import { Injectable, Logger } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { envs } from 'src/config';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    this.logger.log(`Registering user ${registerUserDto.email}`);
    const user = await this.userRepository.findOne({
      where: { email: registerUserDto.email },
    });
    if (user) {
      throw new Error('User already exists');
    }
    const hashedPassword = await this.hashPassword(registerUserDto.password);
    const newUser = this.userRepository.create({
      username: registerUserDto.username,
      email: registerUserDto.email,
      password: hashedPassword,
      roles: ['user'],
      isActive: true,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async login(loginUserDto: LoginUserDto) {
    this.logger.log(`Logging in user ${loginUserDto.email}`);

    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'username', 'email', 'password'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const payload = { username: user.username, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verify(token: string) {
    this.logger.log('Verifying token...');

    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });
      this.logger.log('Token verified successfully.');
      return {
        user,
        token: this.jwtService.sign(user),
      };
    } catch (error) {
      this.logger.error('Token verification failed', error.stack);
      throw new RpcException({
        statusCode: 401,
        message: 'Invalid Token',
        error: error.message,
      });
    }
  }
  
  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
