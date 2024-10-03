import { Args, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/auth/auth.guard';
import { Member } from './member.types';

@Resolver('Member')
@UseGuards(GraphQLAuthGuard)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => Member)
  async getMember(
    @Args('memberId', { nullable: true }) memberId: number,
    @Args('serverId', { nullable: true }) serverId: number,
  ) {
    try {
      return await this.memberService.getMember(memberId, serverId);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => Member)
  async getCurrentMember(
    @Args('profileId', { nullable: true }) profileId: number,
    @Args('serverId', { nullable: true }) serverId: number,
  ) {
    try {
      return await this.memberService.getCurrentMember(profileId, serverId);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
