import { ErroDeValidacao } from '../../domain/erros';
import { SalaRepositoryEmMemoria } from '../../../test/fakes/sala.repository.em-memoria';
import { CriarSalaUseCase } from './criar-sala.use-case';

describe('Criar sala', () => {
  let repositorio: SalaRepositoryEmMemoria;
  let criarSala: CriarSalaUseCase;

  beforeEach(() => {
    repositorio = new SalaRepositoryEmMemoria();
    criarSala = new CriarSalaUseCase(repositorio);
  });

  it('cria uma sala ativa com id', async () => {
    const sala = await criarSala.executar({ nome: 'Sala 101', capacidade: 30, universidadeId: 'UNI-001' });

    expect(sala.id).toBeDefined();
    expect(sala.ativa).toBe(true);
    expect(repositorio.salas).toHaveLength(1);
  });

  it('rejeita capacidade 0', async () => {
    await expect(
      criarSala.executar({ nome: 'Sala 101', capacidade: 0, universidadeId: 'UNI-001' }),
    ).rejects.toThrow(ErroDeValidacao);
  });

  it('rejeita capacidade com casas decimais', async () => {
    await expect(
      criarSala.executar({ nome: 'Sala 101', capacidade: 10.5, universidadeId: 'UNI-001' }),
    ).rejects.toThrow(ErroDeValidacao);
  });

  it('rejeita nome vazio', async () => {
    await expect(
      criarSala.executar({ nome: '   ', capacidade: 30, universidadeId: 'UNI-001' }),
    ).rejects.toThrow(ErroDeValidacao);
  });
});
