import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Auth, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async create(createUserDto: User): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }
  async createList(req: User[]): Promise<User[]> {
    const userEntities = this.usersRepository.create(req);
    return this.usersRepository.save(userEntities);
  }
  async update(id: number, updateUserData: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException(`User with ID ${id} ${user} not found`, HttpStatus.NOT_FOUND);
    }
    Object.assign(user, updateUserData);
    return this.usersRepository.save(user);
  }
  async updateTime(id: number): Promise<User> {
    const query = `UPDATE auth SET timestamp = CURDATE() Where id = '${id}' `;
    const users = await this.usersRepository.query(query);
    return users;
  }

  async findAll(): Promise<User[]> {
    const query = 'SELECT * FROM user WHERE bd is not null';
    const users = await this.usersRepository.query(query);
    return users;
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ id });
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.delete(id);
  }

  async findByUsername(username: string, password: string): Promise<Auth | null> {
    const query = `SELECT * FROM Auth WHERE user = '${username}' and password = '${password}'`;
    const users = await this.usersRepository.query(query);
    return users.length > 0 ? users[0] : null;
  }

}