import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [],
  providers: [PrismaService, JwtService],
  exports: [PrismaService, JwtService],
})
export class GlobalModule {}
