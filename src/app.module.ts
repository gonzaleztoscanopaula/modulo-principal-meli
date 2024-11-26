import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MesaModule } from './mesa/mesa.module';
import { SocioModule } from './socio/socio.module';

@Module({
  imports: [PrismaModule, MesaModule, SocioModule], // Importa PrismaModule y MesaModule
})
export class AppModule {}
