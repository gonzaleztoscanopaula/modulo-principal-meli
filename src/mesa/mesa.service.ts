import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MesaService {
  constructor(private prisma: PrismaService) {}

  async obtenerMesasDisponibles() {
    return this.prisma.mesa.findMany({
      where: { disponible: true },
    });
  }

  async cambiarDisponibilidad(id: number, disponible: boolean) {
    // Verifica si la mesa existe en la base de datos
    const mesa = await this.prisma.mesa.findUnique({ where: { id } });
    if (!mesa) {
      throw new NotFoundException(`Mesa con ID ${id} no encontrada.`);
    }

    return this.prisma.mesa.update({
      where: { id },
      data: { disponible },
    });
  }
}
