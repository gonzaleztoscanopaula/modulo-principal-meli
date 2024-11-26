import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  constructor() {
    super();
  }

  async onModuleInit() {
    console.log('Conectando a la base de datos...');
    await this.$connect();
  }

  async onModuleDestroy() {
    console.log('Desconectando de la base de datos...');
    await this.$disconnect();
  }

  async onApplicationShutdown(signal?: string) {
    console.log(`Cierre de aplicación debido a la señal: ${signal}`);
    await this.$disconnect();
  }
}
