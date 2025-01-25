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
      host: 'localhost',
      port: 3306,
      username: 'apitestd_bookstore',
      password: 'Wtf02848113',
      database: 'apitestd_bookstore',
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
