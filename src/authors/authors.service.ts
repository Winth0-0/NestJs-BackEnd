import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authors, LoginDto } from 'src/entity/authors.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Authors)
    private readonly authorsRepository: Repository<Authors>,
  ) {}

  async login(loginDto: LoginDto): Promise<Authors> {
    const { usrcode, password } = loginDto;
    const user = await this.authorsRepository.findOne({
      where: { usrcode, password },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  } 
}
