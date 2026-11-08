import { Sala } from '../domain/sala';

/**
 * "Porta" do banco de dados.
 * Diz O QUE os casos de uso precisam do banco, sem dizer COMO é feito.
 * Quem implementa é a camada infrastructure (no nosso caso, MongoDB).
 */
export interface SalaRepository {
  salvar(sala: Sala): Promise<Sala>;
  listarAtivas(universidadeId?: string): Promise<Sala[]>;
  buscarPorId(id: string): Promise<Sala | null>;
  atualizar(id: string, sala: Sala): Promise<Sala>;
}

/** Nome usado para "ligar" a porta à implementação (no app.module.ts). */
export const SALA_REPOSITORY = 'SalaRepository';
