import { Schema, isValidObjectId, model } from 'mongoose';
import { SalaRepository } from '../../application/sala.repository';
import { Sala } from '../../domain/sala';

/** Formato do documento "sala" dentro da coleção "salas" no MongoDB. */
const salaSchema = new Schema(
  {
    nome: { type: String, required: true },
    capacidade: { type: Number, required: true },
    universidadeId: { type: String, required: true },
    ativa: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true },
);

const SalaModel = model('Sala', salaSchema, 'salas');

/** Converte o documento do MongoDB (que usa "_id") para a nossa Sala (que usa "id"). */
function paraSala(documento: {
  _id: unknown;
  nome: string;
  capacidade: number;
  universidadeId: string;
  ativa: boolean;
}): Sala {
  return {
    id: String(documento._id),
    nome: documento.nome,
    capacidade: documento.capacidade,
    universidadeId: documento.universidadeId,
    ativa: documento.ativa,
  };
}

/** Implementação da porta SalaRepository usando MongoDB (via Mongoose). */
export class SalaMongoRepository implements SalaRepository {
  async salvar(sala: Sala): Promise<Sala> {
    const documento = await SalaModel.create({
      nome: sala.nome,
      capacidade: sala.capacidade,
      universidadeId: sala.universidadeId,
      ativa: sala.ativa,
    });
    return paraSala(documento);
  }

  async listarAtivas(universidadeId?: string): Promise<Sala[]> {
    const filtro: { ativa: boolean; universidadeId?: string } = { ativa: true };
    if (universidadeId) {
      filtro.universidadeId = String(universidadeId);
    }
    const documentos = await SalaModel.find(filtro).sort({ nome: 1 }).lean();
    return documentos.map(paraSala);
  }

  async buscarPorId(id: string): Promise<Sala | null> {
    // Um id em formato inválido simplesmente não existe (evita erro do Mongo)
    if (!isValidObjectId(id)) {
      return null;
    }
    const documento = await SalaModel.findById(id).lean();
    return documento ? paraSala(documento) : null;
  }

  async atualizar(id: string, sala: Sala): Promise<Sala> {
    const documento = await SalaModel.findByIdAndUpdate(
      id,
      {
        nome: sala.nome,
        capacidade: sala.capacidade,
        universidadeId: sala.universidadeId,
        ativa: sala.ativa,
      },
      { new: true },
    ).lean();
    return paraSala(documento!);
  }
}
