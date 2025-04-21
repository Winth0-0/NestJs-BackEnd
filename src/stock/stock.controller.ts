
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { Goods, TranDto, OrderDto, PromotionDto } from 'src/entity/goodinfo.entity';

@Controller('stock')
export class StockController {
    constructor(
        private readonly stockService: StockService
    ) { }
    @Get('GetStockInfo')
    async GetStockInfo(): Promise<Goods> {
        return this.stockService.Get();
    }
    @Get('GetPromotion/:active/:expired')
    async GetPromotion(
        @Param('active') active: string,
        @Param('expired') expired: string
    ): Promise<any> {
        return this.stockService.GetPromotion(active, expired);
    }
    @Get('GetPromotionList/:id')
    async GetPromotionList(
        @Param('id') id: number
    ): Promise<any> {
        return this.stockService.GetPromotionList(id);
    }
    @Get('GetOrder/:active/:expired')
    async GetOrder(
        @Param('active') active: string,
        @Param('expired') expired: string
    ): Promise<any> {
        return this.stockService.GetOrder(active, expired);
    }
    @Get('GetOrderList/:id')
    async GetOrderList(
        @Param('id') id: string
    ): Promise<any> {
        return this.stockService.GetOrderList(id);
    }
    @Post('UpdateTranStock')
    @HttpCode(200)
    async IUpdateTranStock(@Body() TranDto: TranDto): Promise<any> {
        const res = this.stockService.UpdateTranStock(TranDto);
        return { result: res };
    }
    @Post('UpdateOrderStock')
    @HttpCode(200)
    async IUpdateOrderStock(@Body() OrderDto: OrderDto): Promise<any> {
        const res = this.stockService.UpdateOrderStock(OrderDto);
        return { result: res };
    }
    @Post('SetPromotion')
    @HttpCode(200)
    async ISetPromotion(@Body() PromotionDto: PromotionDto): Promise<any> {
        const res = this.stockService.SetPromotion(PromotionDto);
        return { result: res };
    }
    @Get('GetOrderNow')
    async GetOrderNow(): Promise<any> {
        return this.stockService.GetOrderNow();
    }
    @Get('GetPromotionNow')
    async GetPromotionNow(): Promise<any> {
        return this.stockService.GetPromotionNow();
    }
    @Get('GetSummary')
    async GetSummary(): Promise<any> {
        return this.stockService.GetSummary();
    }
    @Get('GetAllSummary')
    async GetAllSummary(): Promise<any> {
        return this.stockService.GetAllSummary();
    }
}
