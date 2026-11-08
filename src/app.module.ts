import { Module } from '@nestjs/common';
import { HealthController } from './api/health.controller';
import { SalaController } from './api/sala.controller';
import { AtualizarSalaUseCase } from './application/atualizar-sala/atualizar-sala.use-case';
import { BuscarSalaUseCase } from './application/buscar-sala/buscar-sala.use-case';
import { CriarSalaUseCase } from './application/criar-sala/criar-sala.use-case';
import { DesativarSalaUseCase } from './application/desativar-sala/desativar-sala.use-case';
import { ListarSalasUseCase } from './application/listar-salas/listar-salas.use-case';
import { SALA_REPOSITORY, SalaRepository } from './application/sala.repository';
import { SalaMongoRepository } from './infrastructure/mongo/sala.mongo.repository';

/**
 * Liga todas as peças. É o ÚNICO arquivo que conhece todas as camadas.
 * Aqui dizemos: "a porta SalaRepository é implementada pelo MongoDB"
 * e "cada caso de uso recebe esse repositório".
 */
@Module({
  controllers: [SalaController, HealthController],
  providers: [
    { provide: SALA_REPOSITORY, useClass: SalaMongoRepository },
    {
      provide: CriarSalaUseCase,
      useFactory: (repositorio: SalaRepository) => new CriarSalaUseCase(repositorio),
      inject: [SALA_REPOSITORY],
    },
    {
      provide: ListarSalasUseCase,
      useFactory: (repositorio: SalaRepository) => new ListarSalasUseCase(repositorio),
      inject: [SALA_REPOSITORY],
    },
    {
      provide: BuscarSalaUseCase,
      useFactory: (repositorio: SalaRepository) => new BuscarSalaUseCase(repositorio),
      inject: [SALA_REPOSITORY],
    },
    {
      provide: AtualizarSalaUseCase,
      useFactory: (repositorio: SalaRepository) => new AtualizarSalaUseCase(repositorio),
      inject: [SALA_REPOSITORY],
    },
    {
      provide: DesativarSalaUseCase,
      useFactory: (repositorio: SalaRepository) => new DesativarSalaUseCase(repositorio),
      inject: [SALA_REPOSITORY],
    },
  ],
})
export class AppModule {}
