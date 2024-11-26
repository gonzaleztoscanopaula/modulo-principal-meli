import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SocioService } from './socio.service';

@Controller('socios')
export class SocioController {
  constructor(private socioService: SocioService) {}

  // Obtener todos los socios
  @Get()
  async obtenerSocios() {
    return this.socioService.obtenerSocios();
  }

  // Agregar un nuevo socio
  @Post()
  async agregarSocio(
    @Body() data: { nombre: string; descripcion: string; fotoPerfil: string; fotoAdicional: string },
  ) {
    return this.socioService.agregarSocio(data);
  }

  // Actualizar un socio existente
  @Put(':id')
  async actualizarSocio(
    @Param('id') id: string,
    @Body() data: Partial<{ nombre: string; descripcion: string; fotoPerfil: string; fotoAdicional: string }>,
  ) {
    return this.socioService.actualizarSocio(Number(id), data);
  }

  // Eliminar un socio
  @Delete(':id')
  async eliminarSocio(@Param('id') id: string) {
    return this.socioService.eliminarSocio(Number(id));
  }
}
