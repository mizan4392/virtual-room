import { Injectable } from '@nestjs/common';
import { MemberRole } from '@prisma/client';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}
  async createMessage(
    content: string,
    email: string,
    conversationId?: number,
    channelId?: number,
    fileUrl?: string,
  ) {
    if (!conversationId && !channelId)
      return new Error('Missing conversationId or channelId');

    const currentProfile = await this.prismaService.profile.findFirst({
      where: {
        email: email,
      },
    });

    const currentProfileId = currentProfile.id;
    if (!currentProfile) return new Error('Profile not found');

    if (conversationId) {
      const conversation = await this.prismaService.conversation.findFirst({
        where: {
          id: conversationId,
          OR: [
            {
              memberOne: {
                profileId: currentProfileId,
              },
            },
            {
              memberTwo: {
                profileId: currentProfileId,
              },
            },
          ],
        },
        include: {
          memberOne: {
            include: { profile: true },
          },

          memberTwo: {
            include: { profile: true },
          },
        },
      });
      if (!conversation) return new Error('Conversation not found');
      const member =
        conversation.memberOne.profileId === currentProfileId
          ? conversation.memberOne
          : conversation.memberTwo;

      if (!member) return new Error('Member not found');
      const directMessage = await this.prismaService.directMessage.create({
        data: {
          conversationId,
          memberId: member.id,
          content,
          fileUrl,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
      return { message: directMessage };
    } else if (channelId) {
      const channel = await this.prismaService.channel.findFirst({
        where: {
          id: channelId,
        },
      });
      if (!channel) return new Error('Channel not found');
      const member = await this.prismaService.member.findFirst({
        where: {
          profileId: currentProfileId,
          serverId: channel.serverId,
        },
      });
      if (!member) return new Error('Member not found');
      const message = await this.prismaService.message.create({
        data: {
          channelId,
          memberId: member.id,
          content,
          fileUrl,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
          channel: true,
        },
      });
      return { message };
    }
  }

  async getMessages(conversationId: number, channelId: number) {
    if (!channelId && !conversationId)
      return new Error('Missing conversationId or channelId');

    if (conversationId) {
      const conversation = await this.prismaService.conversation.findUnique({
        where: {
          id: conversationId,
        },
      });
      if (!conversation) return new Error('Conversation not found');

      const directMessages = await this.prismaService.directMessage.findMany({
        where: {
          conversationId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'asc',
        },
      });
      return { messages: directMessages };
    } else if (channelId) {
      const channel = await this.prismaService.channel.findUnique({
        where: {
          id: channelId,
        },
      });
      if (!channel) return new Error('Channel not found');

      const messages = await this.prismaService.message.findMany({
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
          channel: true,
        },
        orderBy: {
          updatedAt: 'asc',
        },
      });
      return { messages };
    }
  }

  async deleteMessage(
    messageId: number,
    conversationId: number,
    channelId: number,
    profileId: number,
  ) {
    console.log(conversationId, channelId, messageId, profileId);
    if (conversationId) {
      const conversation = await this.prismaService.conversation.findUnique({
        where: {
          id: conversationId,
          OR: [
            {
              memberOne: {
                profileId,
              },
            },
            {
              memberTwo: {
                profileId,
              },
            },
          ],
        },
        include: {
          memberOne: {
            include: { profile: true },
          },

          memberTwo: {
            include: { profile: true },
          },
        },
      });
      if (!conversation) return new Error('Conversation not found');
      const member =
        conversation.memberOne.profileId === profileId
          ? conversation.memberOne
          : conversation.memberTwo;

      if (!member) return new Error('Member not found');

      const directMessage = await this.prismaService.directMessage.findUnique({
        where: {
          id: messageId,
          conversationId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
      if (!directMessage || directMessage.deleted)
        this.deleteImageFile(directMessage.fileUrl);
      const isAdmin = member.role === MemberRole.ADMIN;
      const isModerator = member.role === MemberRole.MODERATOR;
      const isMessageOwner = directMessage.memberId === member.id;
      const canModify = isMessageOwner || isAdmin || isModerator;
      if (!canModify) return new Error('Unauthorized');
      const updatedDirectMessage =
        await this.prismaService.directMessage.update({
          where: {
            id: messageId,
          },
          data: {
            deleted: true,
            content: 'This message has been deleted',
            fileUrl: null,
          },
          include: {
            member: {
              include: {
                profile: true,
              },
            },
          },
        });
      return { message: updatedDirectMessage };
    } else if (channelId) {
      const channel = await this.prismaService.channel.findUnique({
        where: {
          id: channelId,
        },
      });
      if (!channel) return new Error('Channel not found');
      const member = await this.prismaService.member.findFirst({
        where: {
          profileId,
          serverId: channel.serverId,
        },
      });
      if (!member) return new Error('Member not found');

      const message = await this.prismaService.message.findUnique({
        where: {
          id: messageId,
          channelId,
        },
      });
      if (!message || message.deleted) return new Error('Message not found');

      const isAdmin = member.role === MemberRole.ADMIN;
      const isModerator = member.role === MemberRole.MODERATOR;
      const isMessageOwnwer = message.memberId === member.id;
      const canModify = isMessageOwnwer || isAdmin || isModerator;
      if (!canModify) return new Error('Unauthorized');

      const updatedMessage = await this.prismaService.message.update({
        where: {
          id: messageId,
        },
        data: {
          deleted: true,
          content: 'This message has been deleted',
          fileUrl: null,
        },
        include: {
          channel: true,
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
      return { message: updatedMessage };
    }
  }

  async updateMessage(
    messageId: number,
    memberId: number,
    content: string,
    channelId: number,
    conversationId: number,
  ) {
    if (!channelId && !conversationId)
      return new Error('Missing channelId or conversationId');

    if (conversationId) {
      const directMessage = await this.prismaService.directMessage.findUnique({
        where: {
          id: messageId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });
      if (!directMessage || directMessage.deleted)
        return new Error('Message not found');

      const isMessageOwner = directMessage.memberId === memberId;
      if (!isMessageOwner) return new Error('Unauthorized');
      const updatedDirectMessage =
        await this.prismaService.directMessage.update({
          where: {
            id: messageId,
            conversationId,
          },
          data: {
            content,
          },
          include: {
            member: {
              include: {
                profile: true,
              },
            },
          },
        });
      return { message: updatedDirectMessage };
    } else if (channelId) {
      const message = await this.prismaService.message.findUnique({
        where: {
          id: messageId,
          channelId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
      });
      if (!message || message.deleted) return new Error('Message not found');

      const isMessageOwnwer = message.memberId === memberId;
      if (!isMessageOwnwer) return new Error('Unauthorized');
      const updatedMessage = await this.prismaService.message.update({
        where: {
          id: messageId,
          channelId,
        },
        data: {
          content,
        },
        include: {
          channel: true,
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
      return { message: updatedMessage };
    }
  }

  private async deleteImageFile(fileUrl: string) {
    if (!fileUrl) return;
    const dirPath = join(process.cwd(), 'public', 'images');
    const fileName = fileUrl.split('/').pop();
    const imagePath = join(dirPath, fileName);

    if (existsSync(imagePath)) {
      try {
        unlinkSync(imagePath);
      } catch (err) {
        throw new Error(err.message);
      }
    }
  }
}
