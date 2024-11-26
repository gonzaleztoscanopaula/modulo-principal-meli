import { Module } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { MesaController } from './mesa.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importa PrismaModule

@Module({
  imports: [PrismaModule], // Asegúrate de incluir PrismaModule aquí
  controllers: [MesaController],
  providers: [MesaService],
})
export class MesaModule {}
