import { StockModule } from './stock/stock.module';
import { StockService } from './stock/stock.service';
import { StockController } from './stock/stock.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthorsService } from './authors/authors.service';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
        StockModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'apitestd_lsstock',
      password: 'Wtf02848113',
      database: 'apitestd_lsstock',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '127.0.0.1',
    //   port: 3306,
    //   username: 'root',
    //   password: '1234',
    //   database: 'ls',
    //   entities: [],
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    AuthorsModule,
  ],
  controllers: [
    AppController],
  providers: [
    AppService],
})
export class AppModule {
}
