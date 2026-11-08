import { ErroNaoEncontrado } from '../../domain/erros';
import { SalaRepositoryEmMemoria } from '../../../test/fakes/sala.repository.em-memoria';
import { BuscarSalaUseCase } from './buscar-sala.use-case';

describe('Buscar sala', () => {
  it('encontra uma sala que existe', async () => {
    const repositorio = new SalaRepositoryEmMemoria();
    const salva = await repositorio.salvar({ nome: 'Sala A', capacidade: 10, universidadeId: 'UNI-001', ativa: true });

    const sala = await new BuscarSalaUseCase(repositorio).executar(salva.id!);

    expect(sala.nome).toBe('Sala A');
  });

  it('avisa quando a sala não existe', async () => {
    const buscarSala = new BuscarSalaUseCase(new SalaRepositoryEmMemoria());

    await expect(buscarSala.executar('999')).rejects.toThrow(ErroNaoEncontrado);
  });
});
