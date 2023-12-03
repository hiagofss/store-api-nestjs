import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { IUsersRespository } from './repository/users.interface.respository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IUsersRespository)
    private usersRepository: IUsersRespository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const userEntity = new UserEntity();
    userEntity.name = name;
    userEntity.email = email;
    userEntity.password = password;
    const user = await this.usersRepository.create(userEntity);

    return new UserDto(user.id, user.name, user.email);
  }

  async findAll() {
    const usersCreated = await this.usersRepository.findAll();
    const users = usersCreated.map((user) => {
      return new UserDto(user.id, user.name, user.email);
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findUserById(id);

    return new UserDto(user.id, user.name, user.email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const { name, email, password } = updateUserDto;
    user.name = name;
    user.email = email;
    user.password = password;

    await this.usersRepository.update(id, user);

    return new UserDto(user.id, user.name, user.email);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.usersRepository.delete(id);

    return `User with id #${id} was deleted`;
  }
}
