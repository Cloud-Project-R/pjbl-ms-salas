import { ErroDeValidacao } from './erros';

/** Uma sala da universidade. O "id" só existe depois que a sala é salva no banco. */
export interface Sala {
  id?: string;
  nome: string;
  capacidade: number;
  universidadeId: string;
  ativa: boolean;
}

/** Os dados que o usuário informa para criar ou atualizar uma sala. */
export interface DadosDaSala {
  nome: string;
  capacidade: number;
  universidadeId: string;
}

/**
 * Regras do negócio para uma sala ser válida.
 * Se alguma regra for quebrada, lança ErroDeValidacao com a explicação.
 */
export function validarSala(dados: DadosDaSala): void {
  if (!dados.nome || dados.nome.trim() === '') {
    throw new ErroDeValidacao('O nome da sala é obrigatório.');
  }
  if (!Number.isInteger(dados.capacidade) || dados.capacidade <= 0) {
    throw new ErroDeValidacao('A capacidade deve ser um número inteiro maior que zero.');
  }
  if (!dados.universidadeId || dados.universidadeId.trim() === '') {
    throw new ErroDeValidacao('A universidade da sala é obrigatória.');
  }
}
