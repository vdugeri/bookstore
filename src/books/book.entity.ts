import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('books')
@ObjectType({ description: 'book' })
export class Book {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => ID)
  public id: number;

  @Column({ name: 'name', type: 'varchar', length: '255' })
  @Field()
  public name: string;

  @Column({ name: 'description', type: 'varchar', length: '2550' })
  @Field()
  public description: string;
}
