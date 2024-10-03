import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MemberService {
  constructor(private readonly prismaService: PrismaService) {}
  async getMember(memberId: number, serverId: number) {
    return await this.prismaService.member.findFirst({
      where: {
        id: memberId,
        serverId,
      },
      include: {
        profile: true,
      },
    });
  }

  async getCurrentMember(profileId: number, serverId) {
    return await this.prismaService.member.findFirst({
      where: {
        profileId,
        serverId,
      },
      include: {
        profile: true,
      },
    });
  }

  async getMemberByEmail(email: string, serverId: number) {
    return await this.prismaService.member.findFirst({
      where: {
        profile: {
          email,
        },
        serverId,
      },
    });
  }
}
