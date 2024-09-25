import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ChannelType } from './server.types';

@InputType()
export class CreateServerDto {
  @IsString()
  @Field()
  @IsNotEmpty()
  name: string;
  @Field()
  profileId: number;
}

@InputType()
export class UpdateServerDto {
  @IsString()
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  serverId: number;
}

@InputType()
export class CreateChannelOnServerDto {
  @IsString()
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  serverId: number;

  @Field()
  @IsNotEmpty()
  type: ChannelType;
}
