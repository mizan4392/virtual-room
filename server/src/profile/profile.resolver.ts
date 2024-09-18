import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './profile.types';
import { CreateProfileDto } from './profile.dto';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/auth/auth.guard';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => Profile)
  async createProfile(@Args('input') input: CreateProfileDto) {
    return this.profileService.createProfile(input);
  }

  @Query(() => Profile)
  async getProfileById(@Args('profileId') profileId: number) {
    return this.profileService.getProfile(profileId);
  }
}
