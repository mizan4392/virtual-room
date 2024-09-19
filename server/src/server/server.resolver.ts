import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ServerService } from './server.service';
import { Query } from '@nestjs/graphql';
import { Server } from './server.types';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { CreateServerDto } from './server.dto';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
@Resolver('Server')
@UseGuards(GraphQLAuthGuard)
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => Server)
  async getServers(
    @Args('profileId') profileId: number,
    @Context() ctx: { req: Request },
  ) {
    if (!ctx.req?.profile.email) {
      throw new BadRequestException('Profile not found');
    }
    return this.serverService.getServerByProfileEmailOfMember(
      ctx.req.profile.email,
    );
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
