import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AtualizarSalaUseCase } from '../application/atualizar-sala/atualizar-sala.use-case';
import { BuscarSalaUseCase } from '../application/buscar-sala/buscar-sala.use-case';
import { CriarSalaUseCase } from '../application/criar-sala/criar-sala.use-case';
import { DesativarSalaUseCase } from '../application/desativar-sala/desativar-sala.use-case';
import { ListarSalasUseCase } from '../application/listar-salas/listar-salas.use-case';
import { SalaDto, SalaRespostaDto } from './sala.dto';

/**
 * "Porta HTTP" das salas.
 * Cada rota só recebe o pedido e chama o caso de uso certo.
 * Não existe regra de negócio aqui.
 */
@ApiTags('Salas')
@Controller('salas')
export class SalaController {
  constructor(
    private readonly criarSala: CriarSalaUseCase,
    private readonly listarSalas: ListarSalasUseCase,
    private readonly buscarSala: BuscarSalaUseCase,
    private readonly atualizarSala: AtualizarSalaUseCase,
    private readonly desativarSala: DesativarSalaUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: SalaRespostaDto, description: 'Sala criada' })
  @ApiBadRequestResponse({ description: 'Dados inválidos (ex.: capacidade 0)' })
  criar(@Body() dados: SalaDto) {
    return this.criarSala.executar(dados);
  }

  @Get()
  @ApiQuery({ name: 'universidadeId', required: false, example: 'UNI-001' })
  @ApiOkResponse({ type: [SalaRespostaDto], description: 'Lista de salas ativas' })
  listar(@Query('universidadeId') universidadeId?: string) {
    return this.listarSalas.executar(universidadeId);
  }

  @Get(':id')
  @ApiOkResponse({ type: SalaRespostaDto })
  @ApiNotFoundResponse({ description: 'Sala não encontrada' })
  buscar(@Param('id') id: string) {
    return this.buscarSala.executar(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: SalaRespostaDto, description: 'Sala atualizada' })
  @ApiNotFoundResponse({ description: 'Sala não encontrada' })
  atualizar(@Param('id') id: string, @Body() dados: SalaDto) {
    return this.atualizarSala.executar(id, dados);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Sala desativada (ativa = false)' })
  @ApiNotFoundResponse({ description: 'Sala não encontrada' })
  async desativar(@Param('id') id: string) {
    await this.desativarSala.executar(id);
  }
}
