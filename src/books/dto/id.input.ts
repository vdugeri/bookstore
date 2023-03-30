import { ArgsType, Field, InputType, Int, ID } from '@nestjs/graphql';

@InputType()
export class IDArgs {
  @Field((type) => ID)
  id: number;
}
