# 📚 ThinkBoard — MERN App (MongoDB, Express, React, Node.js)

Aplicação **full‑stack MERN** para criar, listar, atualizar e excluir **notas** (título e conteúdo), com **rate limiting via Upstash Redis** e guia rápido de execução e deploy.

---

## 🎯 Visão Geral
- **Stack:** MongoDB, Express, React (Vite), Node
- **Objetivo:** API REST simples e estável + UI responsiva
- **Destaques:** organização em camadas, variáveis de ambiente e *rate limiting*

---

## ✨ Funcionalidades
- CRUD de notas
- Validação básica de payload
- *Rate limiting* por IP (Upstash Redis)

---

## 🧰 Tecnologias
- **Backend:** Node 18+ (recomendado 22), Express, Mongoose
- **Frontend:** React 18 + Vite
- **Banco:** MongoDB Atlas ou local
- **Infra opcional:** Upstash Redis

---

## 🔐 Configuração

### `.env` do Backend (`/backend`)
```dotenv
NODE_ENV=development
PORT=5001
MONGO_URI=<your_mongo_uri>

UPSTASH_REDIS_REST_URL=<your_redis_rest_url>
UPSTASH_REDIS_REST_TOKEN=<your_redis_rest_token>
```

### `.env` do Frontend (`/frontend`)
```dotenv
VITE_API_URL=http://localhost:5001
```
> Em produção, use a URL pública da API.

---

## ▶️ Como Rodar
```bash
# Backend
cd backend
npm install
npm run dev   # ou npm start em produção

# Frontend
cd frontend
npm install
npm run dev   # abre em http://localhost:5173
```

---

## 🔌 API REST (Notas)
- **Base URL (dev):** `http://localhost:5001/api`
- **Formato:** JSON | **Header:** `Content-Type: application/json`
- **Modelo:** `Note` com campos principais: `title` (string), `content` (string), `createdAt`/`updatedAt` (timestamps do Mongoose, se habilitados).

### Endpoints

#### GET `/api/notes`
Retorna todas as notas **ordenadas por `createdAt` desc** (mais recentes primeiro).

**Resposta 200**
```json
[
  {
    "_id": "66f0b9e6c3a7a4b7e1e0d123",
    "title": "Minha nota",
    "content": "Texto da nota",
    "createdAt": "2025-10-04T12:00:00.000Z",
    "updatedAt": "2025-10-04T12:00:00.000Z"
  }
]
```

#### GET `/api/notes/:id`
Busca uma nota pelo `id`.

- **200**: retorna o objeto da nota
- **404**: `{ "message": "Note not found!" }`
- **500**: `{ "message": "Internal server error" }`

#### POST `/api/notes`
Cria uma nova nota.

**Body (JSON)**
```json
{ "title": "Título", "content": "Conteúdo" }
```

**Respostas**
- **201**: retorna a nota criada
- **500**: `{ "message": "Internal server error" }`

#### PUT `/api/notes/:id`
Atualiza parcialmente os campos `title` e/ou `content`.

**Body (JSON)**
```json
{ "title": "Novo título", "content": "Novo conteúdo" }
```

**Respostas**
- **200**: retorna a nota atualizada
- **404**: `{ "message": "Note not found" }`
- **500**: `{ "message": "Internal server error" }`

#### DELETE `/api/notes/:id`
Remove uma nota pelo `id`.

**Respostas**
- **200**: `{ "message": "Note deleted successfully!" }`
- **404**: `{ "message": "Note not found" }`
- **500**: `{ "message": "Internal server error" }`

### Exemplos cURL
```bash
API=http://localhost:5000/api

# Criar
curl -X POST "$API/notes" \
  -H "Content-Type: application/json" \
  -d '{"title":"Primeira nota","content":"Olá"}'

# Listar
curl "$API/notes"

# Detalhar
curl "$API/notes/<id>"

# Atualizar
curl -X PUT "$API/notes/<id>" -H "Content-Type: application/json" -d '{"title":"Novo título"}'

# Remover
curl -X DELETE "$API/notes/<id>"
```

**Códigos de status**: `200`, `201`, `404`, `500`. `429` pode ocorrer se o *rate limit* for excedido.

> Este projeto **não** inclui endpoint de *healthcheck*; monitore via logs/infra.

---

## ⚙️ Rate Limiting (Upstash)
- Chaves por IP; retorna **429** ao exceder
- Variáveis: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- Sugestão de UI: exibir mensagem amigável e permitir *retry*

---

## 🚀 Deploy (resumo)
**Frontend**
```bash
cd frontend && npm run build   # gera dist/
```
Hospede `dist/` (Vercel/Netlify/etc.) e aponte `VITE_API_URL` para a API pública.

**Backend**
- Provedor (Railway/Render/Fly.io etc.) com `MONGO_URI` e *secrets* configurados
- `NODE_ENV=production` e CORS liberado para o domínio do frontend

---

## 🛠️ Troubleshooting Rápido
- **MongoDB**: revise `MONGO_URI` e IPs liberados no Atlas
- **429**: ajuste limites do *rate limiter* e verifique envs do Upstash
- **Vite imports**: cheque caminhos/maiúsculas e rode os comandos dentro de `frontend/`

---

## 📄 Licença
MIT. Veja `LICENSE`.