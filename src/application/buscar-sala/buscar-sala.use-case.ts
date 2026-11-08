import { ErroNaoEncontrado } from '../../domain/erros';
import { Sala } from '../../domain/sala';
import { SalaRepository } from '../sala.repository';

/** Caso de uso: buscar uma sala pelo id. Se não existir, lança ErroNaoEncontrado. */
export class BuscarSalaUseCase {
  constructor(private readonly repositorio: SalaRepository) {}

  async executar(id: string): Promise<Sala> {
    const sala = await this.repositorio.buscarPorId(id);
    if (!sala) {
      throw new ErroNaoEncontrado(`Sala ${id} não encontrada.`);
    }
    return sala;
  }
}
