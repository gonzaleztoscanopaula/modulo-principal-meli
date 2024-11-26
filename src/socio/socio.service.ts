import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocioService {
  constructor(private prisma: PrismaService) {}

  // Listar todos los socios
  async obtenerSocios() {
    return this.prisma.socio.findMany();
  }

  // Crear un nuevo socio
  async agregarSocio(data: { nombre: string; descripcion: string; fotoPerfil: string; fotoAdicional: string }) {
    return this.prisma.socio.create({
      data,
    });
  }

  // Actualizar un socio existente
  async actualizarSocio(
    id: number,
    data: Partial<{ nombre: string; descripcion: string; fotoPerfil: string; fotoAdicional: string }>,
  ) {
    const socio = await this.prisma.socio.findUnique({ where: { id } });
    if (!socio) {
      throw new NotFoundException(`El socio con ID ${id} no existe`);
    }
    return this.prisma.socio.update({
      where: { id },
      data,
    });
  }

  // Eliminar un socio
  async eliminarSocio(id: number) {
    const socio = await this.prisma.socio.findUnique({ where: { id } });
    if (!socio) {
      throw new NotFoundException(`El socio con ID ${id} no existe`);
    }
    return this.prisma.socio.delete({
      where: { id },
    });
  }
}
