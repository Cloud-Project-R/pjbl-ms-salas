# pjbl-ms-salas

Microserviço de **Salas** da Plataforma de Reservas de Salas Universitárias (PJBL – Entrega 3).
Cuida do cadastro de salas e guarda os dados no **MongoDB Atlas**.

## Arquitetura

O código segue **Clean Architecture** (4 camadas) e **Vertical Slice** (uma pasta por ação do usuário):

```
src/
├─ domain/            regras do negócio, TypeScript puro (sala.ts, erros.ts)
├─ application/       casos de uso, UMA PASTA POR FUNCIONALIDADE
│  ├─ criar-sala/
│  ├─ listar-salas/
│  ├─ buscar-sala/
│  ├─ atualizar-sala/
│  ├─ desativar-sala/
│  └─ sala.repository.ts   "porta": diz o que o caso de uso precisa do banco
├─ infrastructure/    detalhes técnicos (MongoDB com Mongoose)
├─ api/               HTTP: controllers e DTOs (com Swagger)
├─ app.module.ts      liga todas as peças
└─ main.ts            sobe o servidor e o Swagger em /docs
test/architecture/    teste que confere a regra de dependência entre camadas
```

Regra de dependência: `domain` não conhece ninguém; `application` só conhece `domain`;
`infrastructure` e `api` dependem das camadas de dentro. O teste
`test/architecture/dependencias.spec.ts` falha se alguém quebrar essa regra.

Na arquitetura geral, este serviço é chamado **somente pelo BFF** (o front nunca acessa direto).

### Rotas

| Método | Rota | Resposta |
|---|---|---|
| POST | `/salas` | 201 com a sala criada (400 se dados inválidos) |
| GET | `/salas?universidadeId=` | 200 com a lista de salas ativas |
| GET | `/salas/:id` | 200, ou 404 se não existir |
| PUT | `/salas/:id` | 200 com a sala atualizada |
| DELETE | `/salas/:id` | 204 (desativa a sala: `ativa = false`) |
| GET | `/health` | 200 `{ "status": "ok" }` |

Campos da sala: `id`, `nome`, `capacidade` (inteiro maior que 0), `universidadeId`, `ativa`.

## Tecnologias

Node 22, TypeScript, NestJS, Mongoose, MongoDB Atlas, Swagger, Jest, Docker, Azure Container Apps.

## Como rodar

**Local**

1. Copie `.env.example` para `.env` e preencha a `MONGODB_URI`.
2. `npm ci`
3. `npm run start:dev`
4. Abra http://localhost:3001/docs

**Testes:** `npm test` (unitários + arquitetura, não precisam de banco).

**Docker**

```bash
docker build --platform linux/amd64 -t joaovmb/pjbl-ms-salas:v1 .
docker run --rm -p 3001:3000 --env-file .env joaovmb/pjbl-ms-salas:v1
```

**Nuvem**

- Swagger: https://URL-DO-SERVICO/docs
- Imagem: `docker pull joaovmb/pjbl-ms-salas:v1`

## Equipe

João Vitor de Moraes Bringmann, Leonardo Grattão, Eduardo Monteiro, Nicolas Lobo
