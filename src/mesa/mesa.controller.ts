import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Controller('mesas')
export class MesaController {
  constructor(private mesaService: MesaService) {}

  @Get()
  async obtenerTodasLasMesas() {
    return this.mesaService.obtenerTodasLasMesas();
  }

  @Get('disponibles')
  async obtenerMesasDisponibles() {
    return this.mesaService.obtenerMesasDisponibles();
  }

  @Get(':id')
  async obtenerMesaPorId(@Param('id') id: string) {
    return this.mesaService.obtenerMesaPorId(+id);
  }

  @Post()
  async crearMesa(@Body() createMesaDto: CreateMesaDto) {
    return this.mesaService.crearMesa(createMesaDto);
  }
  

  @Put(':id')
  async actualizarMesa(
    @Param('id') id: string,
    @Body() updateMesaDto: UpdateMesaDto,
  ) {
    return this.mesaService.actualizarMesa(+id, updateMesaDto);
  }

  @Put(':id/disponibilidad')
  async cambiarDisponibilidad(
    @Param('id') id: string,
    @Body('disponible') disponible: boolean,
  ) {
    return this.mesaService.cambiarDisponibilidad(+id, disponible);
  }

  @Delete(':id')
  async eliminarMesa(@Param('id') id: string) {
    return this.mesaService.eliminarMesa(+id);
  }
}
