import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from 'src/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientProxy) {}
  // private readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const { user, token: verifiedToken } = await firstValueFrom(
        this.client.send({cmd: 'auth.verify.user'}, token),
      );
      request['user'] = user;
      request['token'] = verifiedToken;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  //   try {
  //     const { user, token: verifiedToken } = await firstValueFrom(
  //       this.client.send({ cmd: 'auth.verify.token' }, { token }),
  //     );
  //     request['user'] = user;
  //     request['token'] = verifiedToken;
  //     this.logger.log('Token verified and user authenticated');
  //   } catch (error) {
  //     this.logger.error('Token verification failed', error.stack);
  //     throw new UnauthorizedException('Invalid token');
  //   }

  //   return true;
  
  // }

  

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const authorizationHeader = request.headers.authorization;
  //   if (!authorizationHeader) {
  //     throw new UnauthorizedException('Authorization header missing');
  //   }
  
  //   const [type, token] = authorizationHeader.split(' ');
    
  //   if (type !== 'Bearer') {
  //     throw new UnauthorizedException('Invalid token type');
  //   }
  
  //   if (!token) {
  //     throw new UnauthorizedException('No token provided');
  //   }
  
  //   return token;
  // }
  
}
