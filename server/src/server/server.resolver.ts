import { Resolver } from '@nestjs/graphql';
import { ServerService } from './server.service';
import { Query } from '@nestjs/graphql';

@Resolver('Server')
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
}
