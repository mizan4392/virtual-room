import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ServerModule } from 'src/server/server.module';
import { ProfileModule } from 'src/profile/profile.module';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [ServerModule, ProfileModule, MemberModule],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
