import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateServerDto {
  @IsString()
  @Field()
  @IsNotEmpty()
  name: string;
  @Field()
  profileId: number;
}
