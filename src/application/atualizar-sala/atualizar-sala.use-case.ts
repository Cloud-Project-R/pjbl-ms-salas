import { ErroNaoEncontrado } from '../../domain/erros';
import { DadosDaSala, Sala, validarSala } from '../../domain/sala';
import { SalaRepository } from '../sala.repository';

/** Caso de uso: atualizar nome, capacidade e universidade de uma sala. */
export class AtualizarSalaUseCase {
  constructor(private readonly repositorio: SalaRepository) {}

  async executar(id: string, dados: DadosDaSala): Promise<Sala> {
    // 1. A sala precisa existir
    const salaAtual = await this.repositorio.buscarPorId(id);
    if (!salaAtual) {
      throw new ErroNaoEncontrado(`Sala ${id} não encontrada.`);
    }

    // 2. Os novos dados precisam seguir as regras do negócio
    validarSala(dados);

    // 3. Junta os dados novos com a sala atual e salva
    const salaAtualizada: Sala = {
      ...salaAtual,
      nome: dados.nome.trim(),
      capacidade: dados.capacidade,
      universidadeId: dados.universidadeId.trim(),
    };
    return this.repositorio.atualizar(id, salaAtualizada);
  }
}
