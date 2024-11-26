import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Injectable()
export class MesaService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todas las mesas disponibles
   */
  async obtenerMesasDisponibles() {
    return this.prisma.mesa.findMany({
      where: { disponible: true },
    });
  }

  /**
   * Obtiene todas las mesas
   */
  async obtenerTodasLasMesas() {
    return this.prisma.mesa.findMany();
  }

  /**
   * Obtiene una mesa por su ID
   * @param id Identificador único de la mesa
   */
  async obtenerMesaPorId(id: number) {
    const mesa = await this.prisma.mesa.findUnique({ where: { id } });
    if (!mesa) {
      throw new NotFoundException(`Mesa con ID ${id} no encontrada.`);
    }
    return mesa;
  }

  /**
   * Crea una nueva mesa
   * @param createMesaDto Datos de la nueva mesa
   */
  async crearMesa(createMesaDto: CreateMesaDto) {
    const { numero, disponible = true } = createMesaDto;

    // Verifica si ya existe una mesa con el mismo número
    const mesaExistente = await this.prisma.mesa.findUnique({
      where: { numero },
    });
    if (mesaExistente) {
      throw new BadRequestException(`Ya existe una mesa con el número ${numero}.`);
    }

    return this.prisma.mesa.create({
      data: { numero, disponible },
    });
  }

  /**
   * Actualiza una mesa existente
   * @param id ID de la mesa
   * @param updateMesaDto Datos a actualizar
   */
  async actualizarMesa(id: number, updateMesaDto: UpdateMesaDto) {
    const mesa = await this.prisma.mesa.findUnique({ where: { id } });
    if (!mesa) {
      throw new NotFoundException(`Mesa con ID ${id} no encontrada.`);
    }

    if (updateMesaDto.numero) {
      // Verifica que no exista otra mesa con el mismo número
      const mesaConMismoNumero = await this.prisma.mesa.findUnique({
        where: { numero: updateMesaDto.numero },
      });
      if (mesaConMismoNumero && mesaConMismoNumero.id !== id) {
        throw new BadRequestException(
          `Ya existe otra mesa con el número ${updateMesaDto.numero}.`,
        );
      }
    }

    return this.prisma.mesa.update({
      where: { id },
      data: updateMesaDto,
    });
  }

  /**
   * Cambia la disponibilidad de una mesa
   * @param id Identificador único de la mesa
   * @param disponible Nuevo estado de disponibilidad
   */
  async cambiarDisponibilidad(id: number, disponible: boolean) {
    const mesa = await this.prisma.mesa.findUnique({ where: { id } });
    if (!mesa) {
      throw new NotFoundException(`Mesa con ID ${id} no encontrada.`);
    }

    return this.prisma.mesa.update({
      where: { id },
      data: { disponible },
    });
  }

  /**
   * Elimina una mesa
   * @param id Identificador único de la mesa
   */
  async eliminarMesa(id: number) {
    const mesa = await this.prisma.mesa.findUnique({ where: { id } });
    if (!mesa) {
      throw new NotFoundException(`Mesa con ID ${id} no encontrada.`);
    }

    return this.prisma.mesa.delete({ where: { id } });
  }
}
