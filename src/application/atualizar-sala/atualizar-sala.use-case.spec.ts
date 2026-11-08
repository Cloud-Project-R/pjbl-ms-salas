import { ErroDeValidacao, ErroNaoEncontrado } from '../../domain/erros';
import { SalaRepositoryEmMemoria } from '../../../test/fakes/sala.repository.em-memoria';
import { AtualizarSalaUseCase } from './atualizar-sala.use-case';

describe('Atualizar sala', () => {
  let repositorio: SalaRepositoryEmMemoria;
  let atualizarSala: AtualizarSalaUseCase;

  beforeEach(() => {
    repositorio = new SalaRepositoryEmMemoria();
    atualizarSala = new AtualizarSalaUseCase(repositorio);
  });

  it('muda os dados de uma sala', async () => {
    const salva = await repositorio.salvar({ nome: 'Sala A', capacidade: 10, universidadeId: 'UNI-001', ativa: true });

    const sala = await atualizarSala.executar(salva.id!, { nome: 'Sala A2', capacidade: 40, universidadeId: 'UNI-001' });

    expect(sala.nome).toBe('Sala A2');
    expect(sala.capacidade).toBe(40);
  });

  it('rejeita capacidade negativa', async () => {
    const salva = await repositorio.salvar({ nome: 'Sala A', capacidade: 10, universidadeId: 'UNI-001', ativa: true });

    await expect(
      atualizarSala.executar(salva.id!, { nome: 'Sala A', capacidade: -5, universidadeId: 'UNI-001' }),
    ).rejects.toThrow(ErroDeValidacao);
  });

  it('avisa quando a sala não existe', async () => {
    await expect(
      atualizarSala.executar('999', { nome: 'Sala A', capacidade: 10, universidadeId: 'UNI-001' }),
    ).rejects.toThrow(ErroNaoEncontrado);
  });
});
