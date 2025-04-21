import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('goodinfo') 
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  goodname: string;

  @Column({ type: 'int', nullable: true })
  stockonhand0: number;

  @Column({ type: 'int', nullable: true })
  stockonhand1: number;

  @Column({ type: 'int', nullable: true })
  stockonhand2: number;

  @Column({ type: 'int', nullable: true })
  stockonhand3: number;

  @Column({ type: 'int', nullable: true })
  stockonhand4: number;

  @Column({ type: 'int', nullable: true })
  stockonhand5: number;

  @Column({ type: 'int', nullable: true })
  unitprice: number;
}

export class TranDto {
  @ApiProperty()
  @IsString()
  fromstock: string;

  @ApiProperty()
  @IsString()
  tostock: string;

  @ApiProperty()
  @IsString()
  usrid: string;

  @ApiProperty()
  @IsString()
  remark: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranItemDto)
  list: TranItemDto[];
}

export class TranItemDto {
  @ApiProperty()
  @IsNumber()
  goodid: number;

  @ApiProperty()
  @IsNumber()
  amou: number;
}

export class OrderDto {
  @ApiProperty()
  @IsString()
  stock: string;
  
  @ApiProperty()
  @IsString()
  usrid: string;

  @ApiProperty()
  @IsString()
  salecode: string;

  @ApiProperty()
  @IsString()
  nameaddr: string;

  @ApiProperty()
  @IsString()
  timecreate: string;

  @ApiProperty()
  @IsString()
  sendaddr: string;

  @ApiProperty()
  @IsString()
  phoneaddr: string;

  @ApiProperty()
  @IsString()
  remark: string;

  @ApiProperty()
  @IsString()
  branch: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  list: OrderItemDto[];
}

export class OrderItemDto {
  @ApiProperty()
  @IsNumber()
  goodid: number;

  @ApiProperty()
  @IsNumber()
  amou: number;

  @ApiProperty()
  @IsNumber()
  unitprice: number;

  @ApiProperty()
  @IsString()
  ispro: string;
}

export class PromotionDto {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  active: string;

  @ApiProperty()
  @IsString()
  expired: string;

  @ApiProperty()
  @IsNumber()
  totalprice: number;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PromotionItemDto)
  list: PromotionItemDto[];
}

export class PromotionItemDto {
  @ApiProperty()
  @IsNumber()
  goodid: number;

  @ApiProperty()
  @IsNumber()
  amou: number;

}

