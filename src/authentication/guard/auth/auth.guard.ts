import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../../../authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized');
    }
    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);

      request.user = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Unauthorized, invalid JWT');
    }

    return true;
  }
}
