import { ErroNaoEncontrado } from '../../domain/erros';
import { SalaRepositoryEmMemoria } from '../../../test/fakes/sala.repository.em-memoria';
import { DesativarSalaUseCase } from './desativar-sala.use-case';

describe('Desativar sala', () => {
  it('marca a sala como inativa em vez de apagar', async () => {
    const repositorio = new SalaRepositoryEmMemoria();
    const salva = await repositorio.salvar({ nome: 'Sala A', capacidade: 10, universidadeId: 'UNI-001', ativa: true });

    await new DesativarSalaUseCase(repositorio).executar(salva.id!);

    expect(repositorio.salas).toHaveLength(1);
    expect(repositorio.salas[0].ativa).toBe(false);
  });

  it('avisa quando a sala não existe', async () => {
    await expect(
      new DesativarSalaUseCase(new SalaRepositoryEmMemoria()).executar('999'),
    ).rejects.toThrow(ErroNaoEncontrado);
  });
});
