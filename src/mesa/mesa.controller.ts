import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { MesaService } from './mesa.service';

@Controller('mesas')
export class MesaController {
  constructor(private mesaService: MesaService) {}

  @Get('disponibles')
  async obtenerMesasDisponibles() {
    return this.mesaService.obtenerMesasDisponibles();
  }

  @Put(':id')
  async cambiarDisponibilidad(
    @Param('id') id: string,
    @Body('disponible') disponible: boolean,
  ) {
    return this.mesaService.cambiarDisponibilidad(+id, disponible);
  }
}
