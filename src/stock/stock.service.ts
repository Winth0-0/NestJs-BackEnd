import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { Goods, TranDto, OrderDto, PromotionDto } from 'src/entity/goodinfo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(Goods)
        private readonly stockRepository: Repository<Goods>,
    ) { }
    async Get(): Promise<Goods> {

        const stock = await this.stockRepository.query(
            ` SELECT * FROM goodinfo `
        );
        if (!stock) {
            throw new HttpException('Error Not Found' + error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return stock;
    }

    async GetPromotion(active: string, expired: string): Promise<any> {
        try {
          const stock = await this.stockRepository.query(
            `SELECT * FROM HistPromotion WHERE active >= ? AND expired <= ?`,
            [active, expired]
          );
      
          return stock;
      
        } catch (error) {
          console.error('DB error:', error);
          throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async GetPromotionList(id: number): Promise<any> {
        try {
          const stock = await this.stockRepository.query(
            `SELECT pl.* , gf.goodname , (gf.stockonhand0+gf.stockonhand1+gf.stockonhand2+gf.stockonhand3+gf.stockonhand4+gf.stockonhand5) as stock , hp.name FROM PromotionList pl
             left join goodinfo gf on gf.id = pl.goodid
             left join histpromotion hp on hp.id = pl.promotionid
             WHERE promotionid = ?`,
            [id]
          );
      
          if (!stock || stock.length === 0) {
            throw new HttpException('No promotions found', HttpStatus.NOT_FOUND);
          }
      
          return stock;
      
        } catch (error) {
          console.error('DB error:', error);
          throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async GetOrder(active: string, expired: string): Promise<any> {
        try {
          const stock = await this.stockRepository.query(
            `SELECT * FROM historder WHERE timecreate >= ? AND timecreate <= ?`,
            [active, expired]
          );
      
          if (!stock || stock.length === 0) {
            throw new HttpException('No promotions found', HttpStatus.NOT_FOUND);
          }
      
          return stock;
      
        } catch (error) {
          console.error('DB error:', error);
          throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async GetOrderList(id: string): Promise<any> {
        try {
          const stock = await this.stockRepository.query(
             `
            SELECT 
                pl.*, 
                CASE 
                    WHEN pl.ispro = '1' THEN prl.name 
                    ELSE gf.goodname 
                END AS productname
            FROM orderlist pl 
            LEFT JOIN goodinfo gf ON gf.id = pl.goodid
            LEFT JOIN histpromotion prl ON prl.id = pl.goodid
            WHERE ordernumb = ?

             `,
            [id]
          );
      
          if (!stock || stock.length === 0) {
            throw new HttpException('No promotions found', HttpStatus.NOT_FOUND);
          }
      
          return stock;
      
        } catch (error) {
          console.error('DB error:', error);
          throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      


  async GetAllSummary(): Promise<any> {
    try {
      const stock = await this.stockRepository.query(
        `
        SELECT 
  ROUND((SELECT SUM(totalprice) 
         FROM apitestd_lsstock.HistOrder 
         WHERE YEAR(timecreate) = YEAR(CURRENT_DATE) 
         AND MONTH(timecreate) = MONTH(CURRENT_DATE)), 2) AS salesthismonth,

  ROUND((SELECT SUM(totalprice) 
         FROM apitestd_lsstock.HistOrder 
         WHERE YEAR(timecreate) = CASE WHEN MONTH(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1 ELSE YEAR(CURRENT_DATE) END
         AND MONTH(timecreate) = CASE WHEN MONTH(CURRENT_DATE) = 1 THEN 12 ELSE MONTH(CURRENT_DATE) - 1 END), 2) AS saleslastmonth,

  ROUND((SELECT SUM(totalprice) FROM apitestd_lsstock.HistOrder), 2) AS totalsales;
         `
      );
  
      if (!stock || stock.length === 0) {
        throw new HttpException('No promotions found', HttpStatus.NOT_FOUND);
      }
  
      return Array.from(stock);
  
    } catch (error) { 
      console.error('DB error:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

      async GetSummary(): Promise<any> {
        try {
          const stock = await this.stockRepository.query(
            `
            SELECT 
            YEAR(timecreate) AS year,
            MONTH(timecreate) AS month,
            ROUND(SUM(totalprice), 2) AS total_sum
            FROM apitestd_lsstock.HistOrder
            GROUP BY YEAR(timecreate), MONTH(timecreate)
            ORDER BY year, month;
             `
          );
      
          if (!stock || stock.length === 0) {
            throw new HttpException('No promotions found', HttpStatus.NOT_FOUND);
          }
      
          return stock;
      
        } catch (error) {
          console.error('DB error:', error);
          throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

    async UpdateTranStock(TranDto: TranDto): Promise<any> {

        await this.stockRepository.query(
            `UPDATE sysinfo SET trannumb = trannumb + 1 WHERE id = 1`
        );
        const result = await this.stockRepository.query(
            ` SELECT trannumb FROM sysinfo where id = 1 `
        );
        const trannumb = result[0]?.trannumb;
        if (!trannumb) {
            throw new HttpException('Error Not Found' + error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const stock = await this.stockRepository.query(
            `INSERT INTO transtock (trannumb, usrid, timecreate, fromstock, tostock) 
             VALUES ('T${trannumb}','${TranDto.usrid}', NOW() , '${TranDto.fromstock}', '${TranDto.tostock}')`
        );
        for (const item of TranDto.list) {
            await this.stockRepository.query(
                `INSERT INTO tranlist (trannumb, goodid, amou) 
               VALUES (?, ?, ?)`,
                [`T${trannumb}`, item.goodid, item.amou]
            );
        }
        for (const item of TranDto.list) {
            await this.stockRepository.query(
                `UPDATE goodinfo 
               SET \`${TranDto.fromstock}\` = \`${TranDto.fromstock}\` - ?, 
                   \`${TranDto.tostock}\` = \`${TranDto.tostock}\` + ?
               WHERE id = ?`,
                [item.amou, item.amou, item.goodid]
            );
        }
        return `T${trannumb}`;
    }

    async UpdateOrderStock(OrderDto: OrderDto): Promise<any> {
        
        await this.stockRepository.query(
            `UPDATE sysinfo SET ordernumb = ordernumb + 1 WHERE id = 1`
        );
        const result = await this.stockRepository.query(
            ` SELECT ordernumb FROM sysinfo where id = 1 `
        );
        const ordernumb = result[0]?.ordernumb;
        if (!ordernumb) {
            throw new HttpException('Error Not Found' + error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const total = OrderDto.list.reduce((sum, item) => sum + (item.unitprice * item.amou), 0);
        const stock = await this.stockRepository.query(
            `INSERT INTO historder (ordernumb, usrid, branch , timecreate , totalprice ,sale,nameaddr, sendaddr ,phoneaddr, remark) 
             VALUES ('LS${ordernumb}','${OrderDto.usrid}','${OrderDto.branch}', '${OrderDto.timecreate}' , ${total} , '${OrderDto.salecode}' ,'${OrderDto.nameaddr}','${OrderDto.sendaddr}','${OrderDto.phoneaddr}','${OrderDto.remark}')`
        );
        for (const item of OrderDto.list) {
            await this.stockRepository.query(
                `INSERT INTO orderlist (ordernumb, goodid, amou , ispro, unitprice) 
                 VALUES (?, ?, ? , ? , ?)`,
                [`LS${ordernumb}`, item.goodid, item.amou, item.ispro, item.unitprice]
            );
        }
        for (const item of OrderDto.list) {
            if (item.ispro == '1') {
                const result = await this.stockRepository.query(
                    ` SELECT * FROM promotionlist where promotionid = ? `,
                    [item.goodid]
                );
                console.log(result);
                for (const items of result) {
                    await this.stockRepository.query(
                        `UPDATE goodinfo 
                         SET \`${OrderDto.stock}\` = \`${OrderDto.stock}\` - ?
                         WHERE id = ?`,
                        [items.amou, items.goodid]
                    );
                }
            } else {
                await this.stockRepository.query(
                    `UPDATE goodinfo 
                     SET \`${OrderDto.stock}\` = \`${OrderDto.stock}\` - ?
                     WHERE id = ?`,
                    [item.amou, item.goodid]
                );
            }
        };
        return `LS${ordernumb}`;
    }

    async SetPromotion(PromotionDto: PromotionDto): Promise<any> {
        const result = await this.stockRepository.query(
            `INSERT INTO histpromotion (name, active, expired, timestamp, status, totalprice) 
             VALUES (?, ?, ?, NOW(), ?, ?)`,
            [PromotionDto.name, PromotionDto.active, PromotionDto.expired, '1', PromotionDto.totalprice]
        );

        const insertedId = result.insertId;
        for (const item of PromotionDto.list) {
            await this.stockRepository.query(
                `INSERT INTO promotionlist (promotionid, goodid, amou) 
                 VALUES (?, ?, ?)`,
                [`${insertedId}`, item.goodid, item.amou]
            );
        }
        return `${insertedId}`;
    }
    async GetOrderNow(): Promise<any> {
        try {
          const stock = await this.stockRepository.query(
            `SELECT * FROM apitestd_lsstock.historder WHERE DATE(timecreate) = CURDATE();`
          );
          return stock;
      
        } catch (error) {
          console.error('DB error:', error);
          throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      async GetPromotionNow(): Promise<any> {
        try {
          const stock = await this.stockRepository.query(
            `SELECT * FROM apitestd_lsstock.histPromotion WHERE DATE(timestamp) = CURDATE();`
          );
          return stock;
        } catch (error) {
          console.error('DB error:', error);
          throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      
}
