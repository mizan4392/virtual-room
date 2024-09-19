import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateServerDto } from './server.dto';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from 'src/member/member.types';
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
}
