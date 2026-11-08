import { DadosDaSala, Sala, validarSala } from '../../domain/sala';
import { SalaRepository } from '../sala.repository';

/** Caso de uso: criar uma nova sala. */
export class CriarSalaUseCase {
  constructor(private readonly repositorio: SalaRepository) {}

  async executar(dados: DadosDaSala): Promise<Sala> {
    // 1. Confere as regras do negócio
    validarSala(dados);

    // 2. Toda sala nova começa ativa
    const novaSala: Sala = {
      nome: dados.nome.trim(),
      capacidade: dados.capacidade,
      universidadeId: dados.universidadeId.trim(),
      ativa: true,
    };

    // 3. Salva no banco e devolve a sala com o id gerado
    return this.repositorio.salvar(novaSala);
  }
}
