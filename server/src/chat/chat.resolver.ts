import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import {
  BadGatewayException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/auth/auth.guard';
import { MessageResult, MessagesResult } from './types';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { ServerResolver } from 'src/server/server.resolver';
import { Request } from 'express';
import { ProfileService } from 'src/profile/profile.service';
import { MemberService } from 'src/member/member.service';
@Resolver()
@UseGuards(GraphQLAuthGuard)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly serverResolver: ServerResolver,
    private readonly profileService: ProfileService,
    private readonly memberService: MemberService,
  ) {}

  @Mutation(() => MessageResult)
  async createMessage(
    @Args('content', { nullable: true }) content: string,
    @Args('currentProfileId', { nullable: true }) currentProfileId: number,
    @Args('conversationId', { nullable: true }) conversationId: number,
    @Args('channelId', { nullable: true }) channelId: number,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload,
    @Context() ctx: { req: Request },
  ) {
    try {
      let imageUrl;
      if (file) {
        imageUrl = await this.serverResolver.storeImageAndGetUrl(file);
      }
      const email = ctx.req?.profile?.email;

      const message = await this.chatService.createMessage(
        content,
        email,
        conversationId,
        channelId,
        imageUrl,
      );
      // this.pubSub.publish('messageCreated', {
      //   messageCreated: message,
      //   conversationId,
      //   channelId,
      // });
      return message;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => MessagesResult)
  async getMessages(
    @Args('conversationId', { nullable: true }) conversationId: number,
    @Args('channelId', { nullable: true }) channelId: number,
  ) {
    try {
      return await this.chatService.getMessages(conversationId, channelId);
    } catch (err) {
      throw new BadGatewayException(err.message);
    }
  }

  @Mutation(() => MessageResult)
  async deleteMessage(
    @Args('messageId') messageId: number,
    @Args('conversationId', { nullable: true }) conversationId: number,
    @Args('channelId', { nullable: true }) channelId: number,
    @Context() ctx: { req: Request },
  ) {
    if (!conversationId && !channelId) {
      throw new BadRequestException('Missing conversationId or channelId');
    }

    const profile = await this.profileService.getProfileByEmail(
      ctx.req.profile.email,
    );
    const deletedMessage = await this.chatService.deleteMessage(
      messageId,
      conversationId,
      channelId,
      profile.id,
    );
    // this.pubSub.publish('messageDeleted', {
    //   messageDeleted: deletedMessage,
    //   conversationId,
    //   channelId,
    // });
    return deletedMessage;
  }

  @Mutation(() => MessageResult)
  async updateMessage(
    @Args('messageId') messageId: number,
    @Args('serverId') serverId: number,
    @Args('content') content: string,
    @Context() ctx: { req: Request },
    @Args('conversationId', { nullable: true }) conversationId: number,
    @Args('channelId', { nullable: true }) channelId: number,
  ) {
    const member = await this.memberService.getMemberByEmail(
      ctx.req.profile.email,
      serverId,
    );
    if (!member) {
      throw new BadRequestException('Member not found');
    }

    const updatedMessage = await this.chatService.updateMessage(
      messageId,
      member.id,
      content,
      channelId,
      conversationId,
    );
    // this.pubSub.publish('messageUpdated', {
    //   messageUpdated: updatedMessage,
    // });
    return updatedMessage;
  }
}
