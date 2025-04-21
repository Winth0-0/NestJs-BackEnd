import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goods } from 'src/entity/goodinfo.entity';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Goods])],
    providers: [StockService],
    controllers: [StockController],
    exports: [StockService],
})
export class StockModule { }
