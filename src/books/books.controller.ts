import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }
}
