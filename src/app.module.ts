import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { AuthorsService } from './authors/authors.service';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsModule } from './authors/authors.module';
import { BookAuthorsModule } from './book_authors/book_authors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'bookstore',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    BooksModule,
    AuthorsModule,
    BookAuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
