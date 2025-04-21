import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usr') 
export class Authors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  usrcode: string;

  @Column({ name: 'fristname', length: 100 })
  fristname: string;

  @Column({ length: 100 })
  lastname: string;

  @Column()
  password: string;

  @Column()
  row: string;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update: Date;
}


export class LoginDto {
  @ApiProperty()
  @IsString()
  usrcode: string;
  
  @ApiProperty()
  @IsString()
  password: string;
}