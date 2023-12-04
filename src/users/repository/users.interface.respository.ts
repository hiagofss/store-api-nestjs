import { UserEntity } from '../entities/user.entity';

export interface IUsersRespository {
  create(user: UserEntity): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findUserById(id: string): Promise<UserEntity | null>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
  update(id: string, user: UserEntity): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;
}

export const IUsersRespository = Symbol('IUsersRespository');
