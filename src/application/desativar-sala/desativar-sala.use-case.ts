import { ErroNaoEncontrado } from '../../domain/erros';
import { SalaRepository } from '../sala.repository';

/**
 * Caso de uso: "excluir" uma sala.
 * A sala não é apagada do banco: ela só fica com ativa = false.
 * Assim as reservas antigas continuam apontando para uma sala que existe.
 */
export class DesativarSalaUseCase {
  constructor(private readonly repositorio: SalaRepository) {}

  async executar(id: string): Promise<void> {
    const sala = await this.repositorio.buscarPorId(id);
    if (!sala) {
      throw new ErroNaoEncontrado(`Sala ${id} não encontrada.`);
    }
    await this.repositorio.atualizar(id, { ...sala, ativa: false });
  }
}
