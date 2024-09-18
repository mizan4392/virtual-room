import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphQlExpress from 'graphql-upload/graphqlUploadExpress.js';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
  });
  app.use(
    graphQlExpress({
      maxFileSize: 10000000,
      maxFiles: 1,
    }),
  );
  await app.listen(3000);
}
bootstrap();
