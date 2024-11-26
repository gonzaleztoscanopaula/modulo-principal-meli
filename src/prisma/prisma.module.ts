import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Hace que el módulo esté disponible globalmente
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta PrismaService
})
export class PrismaModule {}
