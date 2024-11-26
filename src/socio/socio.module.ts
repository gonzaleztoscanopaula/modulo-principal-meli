import { Module } from '@nestjs/common';
import { SocioService } from './socio.service';
import { SocioController } from './socio.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importa PrismaModule

@Module({
  imports: [PrismaModule], // Asegúrate de importar PrismaModule
  controllers: [SocioController],
  providers: [SocioService],
})
export class SocioModule {}
