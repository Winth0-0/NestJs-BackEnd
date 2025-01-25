import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number; // รหัสผู้แต่ง

  @Column({ type: 'varchar', length: 100 })
  first_name: string; // ชื่อ

  @Column({ type: 'varchar', length: 100 })
  last_name: string; // นามสกุล

  @Column({ type: 'varchar', length: 100, nullable: true })
  pen_name: string; // นามปากกา (ถ้ามี)
}