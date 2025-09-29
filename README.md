# 📚 ThinkBoard — MERN App (MongoDB, Express, React, Node.js)


> **Resumo:** Aplicação **MERN** com **API RESTful** em **Node.js + Express**, persistência em **MongoDB** e frontend em **React**. Este guia cobre instalação, configuração (`.env`), estrutura, scripts e endpoints principais. *(Opcional: cache/sessões com Redis).*
> **Status:** v1 (em desenvolvimento)

---

## Sumário

* [Stack](#stack)
* [Requisitos](#requisitos)
* [Estrutura do projeto](#estrutura-do-projeto)
* [Configuração](#configuração)
* [Rodando a aplicação](#rodando-a-aplicação)
* [Scripts úteis](#scripts-úteis)
* [Endpoints principais](#endpoints-principais)
* [Padrões e boas práticas](#padrões-e-boas-práticas)
* [Arquitetura](#arquitetura)
* [Roadmap](#roadmap)
* [Licença](#licença)

---

## Stack

* **MongoDB** — Banco de dados NoSQL
* **Express** — Framework web do Node.js
* **React** — Frontend
* **Node.js** — Runtime JavaScript
* **(Opcional)** **Redis** — Cache, rate limit, sessões

> Se o repositório for *monorepo*, ele contém `backend/` (MEN) e `frontend/` (React). Caso contrário, utilize este README apenas para o que estiver presente.

---

## Requisitos

* **Node.js**: 22.6.0 (ou superior LTS)
* **npm** ou **pnpm**/**yarn**
* **MongoDB** local ou **MongoDB Atlas**
* **(Opcional)** Docker & Docker Compose
* **(Opcional)** Redis (local ou serviço gerenciado)

---

## Estrutura do projeto

```
mern-thinkboard/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── middlewares/
│   ├── test/
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── docker-compose.yml (opcional)
├── README.md
└── .gitignore
```

---

## Configuração

Crie um arquivo **`.env`** no diretório `backend/` com as variáveis abaixo:

```ini
# backend/.env
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/thinkboard
JWT_SECRET=troque-por-um-segredo-forte
CLIENT_URL=http://localhost:5173

# (opcional)
REDIS_URL=redis://localhost:6379
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

Para o **frontend**, crie `.env` conforme o bundler (Vite, CRA, etc.). Exemplo (Vite):

```ini
# frontend/.env
VITE_API_BASE_URL=http://localhost:4000
```

---

## Rodando a aplicação

### Opção A — Monorepo (dois pacotes)

```bash
# 1) instalar dependências
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# 2) subir backend
cd backend
npm run dev

# 3) em outra aba, subir frontend
cd ../frontend
npm run dev
```

### Opção B — Docker (opcional)

```bash
docker compose up -d --build
```

---

## Scripts úteis

**Backend** (`backend/package.json`):

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "lint": "eslint .",
    "test": "vitest --run"
  }
}
```

**Frontend** (`frontend/package.json` — Vite):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Endpoints principais

> Base URL: `http://localhost:4000/api`

### Notes

* `GET /notes` — Lista notas (ordenadas por `createdAt` desc)
* `GET /notes/:id` — Detalhe de uma nota
* `POST /notes` — Cria nota `{ title, content }`
* `PUT /notes/:id` — Atualiza nota
* `DELETE /notes/:id` — Remove nota

**Modelo** (exemplo):

```ts
Note {
  _id: ObjectId,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date
}
```

**Respostas de erro** (padrão):

```json
{ "message": "Internal server error" }
{ "message": "Note not found!" }
```

*(Adapte para seus recursos reais: auth, usuários, tags, etc.)*

---

## Padrões e boas práticas

* **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`…)
* **Lint/Format:** ESLint + Prettier (CI bloqueia código fora do padrão)
* **Variáveis de ambiente:** nunca comite `.env` — use `.env.example`
* **Controle de dependências:** comite `package-lock.json` (reprodutibilidade)
* **CI/CD:** build, lint, testes, e deploy automatizado
* **Erros & Logs:** middleware padrão + correlação de requests
* **Segurança:** Helmet, CORS estrito, validação (Zod/Yup), rate limit (Redis opcional)

---

## Arquitetura

* **Backend (MEN):** Express + Mongoose, camadas `routes → controllers → services → models`
* **Frontend (React):** SPA com roteamento, páginas e services de API
* **Banco:** MongoDB (Atlas/local)
* **Cache (opcional):** Redis (sessions, rate limit, cache de consultas)

> Diagrama sugerido: inclua a imagem `docs/architecture.png` e referencie aqui.

---

## Roadmap

* [ ] Autenticação JWT
* [ ] Testes E2E (Playwright/Cypress) e API (Vitest/Supertest)
* [ ] Observabilidade (metrics + logs estruturados)
* [ ] Docker Compose completo (Mongo, Redis, API, Web)
* [ ] Deploy (Render/Fly/EC2) + variáveis de ambiente por ambiente

---

## Licença

Este projeto é distribuído sob a licença MIT. Veja `LICENSE` para mais detalhes.
