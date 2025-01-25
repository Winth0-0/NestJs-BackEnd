import { Module } from '@nestjs/common';
import { BookAuthorsController } from './book_authors.controller';
import { BookAuthorsService } from './book_authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorBook } from 'src/entity/book_authors.entity';
import { BooksModule } from 'src/books/books.module';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorBook]) , BooksModule ,AuthorsModule], 
  providers: [BookAuthorsService],
  controllers: [BookAuthorsController],
  exports: [BookAuthorsService],
})
export class BookAuthorsModule {}
