import { Sala } from '../../domain/sala';
import { SalaRepository } from '../sala.repository';

/** Caso de uso: listar as salas ativas (opcionalmente de uma universidade só). */
export class ListarSalasUseCase {
  constructor(private readonly repositorio: SalaRepository) {}

  async executar(universidadeId?: string): Promise<Sala[]> {
    return this.repositorio.listarAtivas(universidadeId);
  }
}
