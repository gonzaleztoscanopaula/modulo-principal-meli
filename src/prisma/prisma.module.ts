import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Proveedor PrismaService
  exports: [PrismaService],  // Exporta PrismaService para otros módulos
})
export class PrismaModule {}
