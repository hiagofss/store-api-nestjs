import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
@ValidatorConstraint({ name: 'isUniqueEmail', async: true })
export class IsUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private usersRepository: UsersRepository) {}
  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const user = await this.usersRepository.findUserByEmail(email);
    return !user;
  }
}

export const IsUniqueEmail = (validationArguments: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUniqueEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationArguments,
      validator: IsUniqueEmailValidator,
    });
  };
};
