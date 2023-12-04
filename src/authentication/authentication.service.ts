import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  auth(email: string, password: string) {
    return 'This action adds a new authentication';
  }
}
