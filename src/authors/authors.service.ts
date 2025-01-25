import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/entity/authors.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
    constructor(
            @InjectRepository(Author)
            private authorsRepository: Repository<Author>,
        ) { }
        async GetAuthorsById(id: number): Promise<Author | null> {
          return await this.authorsRepository.findOne({
            where: { id: id },
          });
        }
        
}
