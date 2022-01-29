# FLASH CHAT IO - BACKEND GUIA DE DESENVOLVIMENTO

# Pré-requisitos

Antes de rodar o projeto precisamos de algumas ferramentas instaladas

- Node.js versão ≥=14

# Instalação de dependências

```powershell
npm install
ou
yarn install
```

# Configuração do ambiente

O projeto precisa de algumas **váriaveis de ambiente** configuradas para funcionar corretamente**,** crie um arquivo na raiz do projeto chamado **.env**

```jsx
// Variáveis obrigatórias
MONGO_URI= // string de conexão com MongoDB
JWT_SECRET= // senha do JWT, é recomendado colocar uma senha forte

// Variáveis editáveis e seus valores padrões

PORT=3001 // porta do servidor
WEBSOCKET_CORS_ORIGIN=sem valor padrão // dominio em que fará comunicação websocket
```

# Rodando o projeto

Após instalar as dependências e configurar o ambiente de desenvolvimento é possivel rodar o projeto com o comando:

```jsx
yarn start:dev
```

## Rotas

### /sign-up

### Request Body

```json
{
  "email": "email[@email.com](mailto:last@last.com)",
  "password": "alguma senha",
  "name": "Seu Nome",
  "birthdate": "1999-12-20", // aceita o padrão ISO 8601
  "photo": "base64"
}
```

### Response Body

```json
{
	"user": {
		"email": "email@email.com",
		"name": "Seu Nome",
		"birthdate": "1999-12-20T00:00:00.000Z",
		"photo": "base64",
		"createdAt": "2022-01-29T21:34:15.706Z",
		"updatedAt": "2022-01-29T21:34:15.706Z",
		"id": "61f5b2d7c500da1d000fa4e0"
	}
}
```

### Possíveis status de retorno

- 500 - Erro interno do servidor
- 400 - Requisição incorreta
- 201  - Criado com sucesso

### **/sign-in**

### Request Body

```json
{
  "email": "email[@email.com](mailto:last@last.com)",
  "password": "alguma senha"
}
```

### Response Body

```json
{
	"token": "eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiNjFmNWE3ZDBjNTAwZGExZDAwMGZhNGQyIn0.ujW90ttLf_OxnSyFHNHH-LrwqFR4M57m-N8kd8Vrq2s",
	"id": "61f5b2d7c500da1d000fa4e0"
}
```

### Possíveis status de retorno

- 500 - Erro interno do servidor
- 400 - Requisição incorreta
- 401  - Não autorizado
- 200 - Sucesso

---

## Rotas protegidas

### /me

### Header obrigatório

```json
Authorization: Bearer token // substitua pelo seu token
```

### Response Body

```json
{
	"user": {
		"email": "email@email.com",
		"name": "Seu Nome",
		"birthdate": "1999-12-20T00:00:00.000Z",
		"photo": "base64",
		"createdAt": "2022-01-29T20:47:12.907Z",
		"updatedAt": "2022-01-29T20:47:12.907Z",
		"id": "61f5b2d7c500da1d000fa4e0"
	}
}
```

### Possíveis status de retorno

- 500 - Erro interno do servidor
- 400 - Requisição incorreta
- 200 - Sucesso