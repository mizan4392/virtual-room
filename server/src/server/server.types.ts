import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Member } from 'src/member/member.types';
import { Profile } from 'src/profile/profile.types';

@ObjectType()
export class Channel {
  @Field(() => ID)
  id: string;
  @Field({ nullable: true })
  name: string;

  @Field(() => ChannelType)
  type: ChannelType;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field(() => [Member], { nullable: true })
  members: Member[];
}

export enum ChannelType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}

registerEnumType(ChannelType, {
  name: 'ChannelType',
  description: 'Defines the type of channel',
});

@ObjectType()
export class Server {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  imageUrl: string;
  @Field({ nullable: true })
  inviteCode: string;

  @Field()
  profileId: number;
  @Field(() => Profile, { nullable: true })
  profile: Profile;

  @Field(() => [Member], { nullable: 'itemsAndList' })
  members: Member[];
  @Field({ nullable: true })
  createdAt?: string;
  @Field({ nullable: true })
  updatedAt?: string;
  @Field(() => [Channel])
  channels: Channel[];
}
