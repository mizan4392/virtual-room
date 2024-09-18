import { Field, ObjectType } from '@nestjs/graphql';
import { Channel, Server } from 'src/server/server.types';

@ObjectType()
export class Profile {
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  email: string;

  @Field(() => [Channel], { nullable: 'itemsAndList' })
  channels: Channel[];

  @Field(() => [Server], { nullable: 'itemsAndList' })
  servers: Server[];

  @Field()
  imageUrl: string;
}
