import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ServerService } from './server.service';
import { Query } from '@nestjs/graphql';
import { Server } from './server.types';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import {
  CreateChannelOnServerDto,
  CreateServerDto,
  UpdateServerDto,
} from './server.dto';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
@Resolver('Server')
@UseGuards(GraphQLAuthGuard)
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => [Server])
  async getServers(@Context() ctx: { req: Request }) {
    if (!ctx.req.profile?.email) {
      throw new BadRequestException('Profile not found');
    }
    return this.serverService.getServerByProfileEmailOfMember(
      ctx.req.profile?.email,
    );
  }

  @Query(() => Server)
  async getServer(
    @Args('id', { nullable: true }) id: number,
    @Context() ctx: { req: Request },
  ) {
    if (!ctx.req.profile?.email) {
      throw new BadRequestException('Profile not found');
    }
    return this.serverService.getServer(id, ctx.req.profile?.email);
  }

  @Mutation(() => Server)
  async createServer(
    @Args('input') input: CreateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload,
  ) {
    const imageUrl = file ? await this.storeImageAndGetUrl(file) : null;

    return this.serverService.createServer(input, imageUrl);
  }

  @Mutation(() => Server)
  async updateServerWithNewInviteCode(@Args('serverId') serverId: number) {
    try {
      return this.serverService.updateServerWithNewInviteCode(serverId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Mutation(() => Server)
  async updateServer(
    @Args('input') input: UpdateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload,
  ) {
    let imageUrl;

    if (file) {
      imageUrl = await this.storeImageAndGetUrl(file);
    }

    try {
      return this.serverService.updateServer(input, imageUrl);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Mutation(() => Server)
  async createChannel(
    @Args('input') input: CreateChannelOnServerDto,
    @Context() ctx: { req: Request },
  ) {
    try {
      return this.serverService.createChannel(input, ctx.req.profile?.email);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Mutation(() => Server)
  async leaveServer(
    @Args('serverId', { nullable: true }) serverId: number,
    @Context() ctx: { req: Request },
  ) {
    try {
      return this.serverService.leaveServer(serverId, ctx.req.profile?.email);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Mutation(() => Server)
  async deleteServer(
    @Args('serverId', { nullable: true }) serverId: number,
    @Context() ctx: { req: Request },
  ) {
    try {
      return this.serverService.deleteServer(serverId, ctx.req.profile?.email);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Mutation(() => Server)
  async deleteChannelFromServer(
    @Args('channelId', { nullable: true }) channelId: number,
    @Context() ctx: { req: Request },
  ) {
    try {
      return this.serverService.deleteChannelFromServer(
        channelId,
        ctx.req.profile?.email,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private async storeImageAndGetUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const path = join(process.cwd(), 'public', 'images', uniqueFilename);
    const imageUrl = `${process.env.API_URL}/images/${uniqueFilename}`;
    if (!existsSync(join(process.cwd(), 'public', 'images'))) {
      mkdirSync(join(process.cwd(), 'public', 'images'), { recursive: true });
    }
    const stream = createReadStream();
    stream.pipe(createWriteStream(path));
    return imageUrl;
  }
}
