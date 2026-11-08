import { SalaRepository } from '../../src/application/sala.repository';
import { Sala } from '../../src/domain/sala';

/**
 * Banco de dados FALSO, usado só nos testes.
 * Guarda as salas numa lista na memória, então o teste roda sem MongoDB.
 */
export class SalaRepositoryEmMemoria implements SalaRepository {
  salas: Sala[] = [];
  private proximoId = 1;

  async salvar(sala: Sala): Promise<Sala> {
    const salaSalva = { ...sala, id: String(this.proximoId++) };
    this.salas.push(salaSalva);
    return salaSalva;
  }

  async listarAtivas(universidadeId?: string): Promise<Sala[]> {
    return this.salas.filter(
      (sala) => sala.ativa && (!universidadeId || sala.universidadeId === universidadeId),
    );
  }

  async buscarPorId(id: string): Promise<Sala | null> {
    return this.salas.find((sala) => sala.id === id) ?? null;
  }

  async atualizar(id: string, sala: Sala): Promise<Sala> {
    const posicao = this.salas.findIndex((s) => s.id === id);
    this.salas[posicao] = { ...sala, id };
    return this.salas[posicao];
  }
}
