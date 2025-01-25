import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookAuthorsService } from './book_authors.service';
import { BooksService } from 'src/books/books.service';
import { AuthorsService } from 'src/authors/authors.service';
import { BookRes } from 'src/entity/book_authors.entity';

@ApiTags('Books')
@Controller('book-authors')
export class BookAuthorsController {
    constructor(private readonly bookAuthorsService: BookAuthorsService, private readonly booksService: BooksService, private readonly authorsService: AuthorsService) { }
    @Get('GetBooksAuthors')
    async IGetBooksAuthors() {
        try {
          const res = await this.booksService.GetBooks();
          const bookRes = [];
      
          for (let book of res) {
            const bookAuthors = await this.bookAuthorsService.GetBooksAuthors(book.id);
            const authorList = [];
            const authorsDetails = await Promise.all(
              bookAuthors.map(async (bookAuthor) => {
                const author = await this.authorsService.GetAuthorsById(bookAuthor.author_id);
                return author; 
              }),
            );
            if(authorsDetails.length > 0) {
                bookRes.push({
                    book,
                    authors: authorsDetails,
                  });
            }
          }
          return bookRes; 
        } catch (error) {
          console.error('Error Not Found', error);
          throw new HttpException('Error Not Found: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}
