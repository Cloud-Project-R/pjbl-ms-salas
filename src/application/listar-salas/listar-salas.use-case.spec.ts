import { SalaRepositoryEmMemoria } from '../../../test/fakes/sala.repository.em-memoria';
import { ListarSalasUseCase } from './listar-salas.use-case';

describe('Listar salas', () => {
  it('mostra só as salas ativas da universidade pedida', async () => {
    const repositorio = new SalaRepositoryEmMemoria();
    await repositorio.salvar({ nome: 'Sala A', capacidade: 10, universidadeId: 'UNI-001', ativa: true });
    await repositorio.salvar({ nome: 'Sala B', capacidade: 10, universidadeId: 'UNI-001', ativa: false });
    await repositorio.salvar({ nome: 'Sala C', capacidade: 10, universidadeId: 'UNI-002', ativa: true });

    const salas = await new ListarSalasUseCase(repositorio).executar('UNI-001');

    expect(salas.map((s) => s.nome)).toEqual(['Sala A']);
  });
});
