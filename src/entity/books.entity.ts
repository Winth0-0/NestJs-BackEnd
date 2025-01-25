import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books') 
export class Book {
  @PrimaryGeneratedColumn()
  id: number; // รหัสหนังสือ

  @Column({ type: 'varchar', length: 255 })
  title: string; // ชื่อหนังสือ

  @Column({ type: 'varchar', length: 255, nullable: true })
  publisher: string; // สำนักพิมพ์

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number; // ราคา

  @Column({ type: 'year', nullable: true })
  publication_year: number; // ปีที่พิมพ์

  
}