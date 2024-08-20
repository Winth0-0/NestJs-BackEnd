import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsOptional, IsDate } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    add: string;

    @Column({ type: 'datetime', nullable: true })
    bd: Date | null;
}

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsString()
    @IsOptional()
    readonly add?: string;

    @IsDate()
    @IsOptional()
    readonly bd?: Date;
}

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user: string;

  @Column()
  password: string;

  @Column({ default: 'active' }) 
  status: string;
}

export class LoginDto {
    @IsString()
    username: string;
  
    @IsString()
    password: string;
  }