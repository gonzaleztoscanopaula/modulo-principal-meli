import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar hooks de apagado solo si estás usando `$on`
  const prismaService = app.get(PrismaService);


  await app.listen(3000, () => {
    console.log('Aplicación corriendo en http://localhost:3000');
  });
}
bootstrap();
