import { Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';

@Resolver('Member')
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}
}
