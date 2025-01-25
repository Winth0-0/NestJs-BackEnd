import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorBook } from 'src/entity/book_authors.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookAuthorsService {
    constructor(
        @InjectRepository(AuthorBook)
        private bookAuthorsRepository: Repository<AuthorBook>,
    ) { }
    async GetBooksAuthors(idbook: number): Promise<AuthorBook[] | []> {
        return await this.bookAuthorsRepository.find({
            where: { book_id: idbook }
        });
    }

}
