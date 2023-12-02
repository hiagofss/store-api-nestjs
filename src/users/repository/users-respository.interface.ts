import { UserEntity } from '../entities/user.entity';

export interface IUsersRespository {
  create(user: UserEntity);
  findAll();
  findUserById(id: string);
  findUserByEmail(email: string);
  update(id: string, user: UserEntity);
  delete(id: string);
}

export const IUsersRespository = Symbol('IUsersRespository');
