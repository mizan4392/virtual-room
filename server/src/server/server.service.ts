import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateServerDto,
  UpdateServerDto,
  CreateChannelOnServerDto,
} from './server.dto';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from 'src/member/member.types';
import { ChannelType } from './server.types';

@Injectable()
export class ServerService {
  constructor(private readonly prismaService: PrismaService) {}

  async createServer(data: CreateServerDto, imageUrl: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        id: data.profileId,
      },
    });
    console.log('---', profile);
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    return this.prismaService.server.create({
      data: {
        ...data,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: 'general',
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
      include: {
        members: true,
      },
    });
  }

  async getServer(id: number, email: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    const server = await this.prismaService.server.findUnique({
      where: {
        id,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        channels: true,
        members: true,
      },
    });

    if (!server) {
      throw new BadRequestException('Server not found');
    }

    return server;
  }

  async getServerByProfileEmailOfMember(email: string) {
    return this.prismaService.server.findMany({
      where: {
        members: {
          some: {
            profile: {
              email,
            },
          },
        },
      },
    });
  }

  async updateServerWithNewInviteCode(serverId: number) {
    await this.getServerById(serverId);

    return this.prismaService.server.update({
      where: {
        id: serverId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
  }

  async updateServer(data: UpdateServerDto, imageUrl: string) {
    await this.getServerById(data.serverId);
    return this.prismaService.server.update({
      where: {
        id: data.serverId,
      },
      data: {
        name: data.name,
        imageUrl,
      },
    });
  }

  async createChannel(data: CreateChannelOnServerDto, email: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    return this.prismaService.server.update({
      where: {
        id: data.serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name: data.name,
            type: ChannelType[data.type],
            profileId: profile.id,
          },
        },
      },
    });
  }

  async getServerById(serverId: number) {
    const server = await this.prismaService.server.findUnique({
      where: {
        id: serverId,
      },
    });
    if (!server) {
      throw new BadRequestException('Server not found');
    }
    return server;
  }

  async leaveServer(serverId: number, email: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    return this.prismaService.server.update({
      where: {
        id: serverId,
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
  }

  async deleteServer(serverId: number, email: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    const server = await this.prismaService.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN],
            },
          },
        },
      },
    });
    if (!server) {
      throw new BadRequestException('Server not found');
    }
    return this.prismaService.server.delete({
      where: {
        id: server.id,
      },
    });
  }

  async deleteChannelFromServer(channelId: number, email: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    const channel = await this.prismaService.channel.findUnique({
      where: {
        id: channelId,
        profileId: profile.id,
        NOT: {
          name: 'general',
        },
      },
    });
    if (!channel) {
      throw new BadRequestException('Channel not found');
    }
    return this.prismaService.channel.delete({
      where: {
        id: channelId,
      },
    });
  }
}
