import { setServers } from 'dns';
import mongoose from 'mongoose';

/** Abre a conexão com o MongoDB Atlas. É chamada uma vez, quando o serviço sobe. */
export async function conectarMongo(uri: string): Promise<void> {
  // Opcional (só para uso local): alguns roteadores/Windows não respondem à
  // consulta DNS que o "mongodb+srv://" faz. Ex.: DNS_SERVIDORES=8.8.8.8,1.1.1.1
  if (process.env.DNS_SERVIDORES) {
    setServers(process.env.DNS_SERVIDORES.split(','));
  }

  // Segurança: remove operadores como "$ne" ou "$gt" que alguém tente
  // enviar nos filtros de busca (evita "NoSQL injection").
  mongoose.set('sanitizeFilter', true);

  await mongoose.connect(uri, { dbName: 'pjbl-salas' });
  console.log('Conectado ao MongoDB Atlas');
}
