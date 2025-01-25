import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './books.entity';
import { Author } from './authors.entity';

@Entity('book_authors') 
export class AuthorBook {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  book_id: number; // รหัสหนังสือ (เชื่อมกับตาราง books)

  @Column()
  author_id: number; // รหัสผู้แต่ง (เชื่อมกับตาราง authors)
}


export class BookRes {
  book: Book; 

  Author: Author[] | [];
}