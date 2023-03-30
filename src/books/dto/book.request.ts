import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class BookRequest {
  @Field()
  @MaxLength(255)
  name: string;

  @Field()
  @MaxLength(2550)
  description: string;
}
