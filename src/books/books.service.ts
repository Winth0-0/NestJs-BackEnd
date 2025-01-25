import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entity/books.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
    ) { }
    async GetBooks(): Promise<Book[] | []> {
        return await this.booksRepository.find({});
    }
    async GetBooksById(id: number): Promise<Book[] | []> {
        return await this.booksRepository.find(
          {
            where: {
                id: id
            }
          }
        );
      }
}
