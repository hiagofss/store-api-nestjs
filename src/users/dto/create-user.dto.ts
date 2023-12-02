import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validator/is-unique-email.validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsUniqueEmail({
    message: 'Email $value already exists. Choose another email.',
  })
  email: string;
  @MinLength(8)
  password: string;
}
