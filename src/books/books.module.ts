import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from 'src/entity/books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book])], 
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
