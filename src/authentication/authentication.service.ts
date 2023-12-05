import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUsersRespository } from 'src/users/repository/users.interface.respository';
@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(IUsersRespository)
    private readonly usersRepository: IUsersRespository,
    private jwtService: JwtService,
  ) {}
  async auth(email: string, password: string) {
    const userExists = await this.usersRepository.findUserByEmail(email);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const passwordMatched = await bcrypt.compare(password, userExists.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = {
      sub: userExists.id,
      name: userExists.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
