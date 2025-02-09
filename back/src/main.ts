import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
.then(() => {
  console.log('Server started in http://localhost:3000');
})
.catch((e) =>
  console.error(`Error started while server starting as \n ${e.message}`),
);
