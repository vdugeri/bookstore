import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ name: 'name', type: 'varchar', length: '255' })
  public name: string;

  @Column({ name: 'description', type: 'varchar', length: '2550' })
  public description: string;
}
