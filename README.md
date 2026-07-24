# 📚 Library Manager API

Uma API REST desenvolvida com **Node.js**, **Express** e **PostgreSQL** para gerenciamento de livros.

Este projeto foi criado com o objetivo de praticar conceitos de desenvolvimento backend, incluindo CRUD, integração com banco de dados, documentação de API e deploy em produção.

---

## 🚀 Tecnologias

- Node.js
- Express.js
- PostgreSQL
- Neon Database
- Swagger (OpenAPI)
- Render

---

## ✨ Funcionalidades

- 📖 Listar todos os livros
- ➕ Cadastrar um novo livro
- ✏️ Editar um livro existente
- 🗑️ Remover um livro

---

## 📚 Endpoints

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/books` | Lista todos os livros |
| POST | `/books` | Cadastra um novo livro |
| PUT | `/books/{id}` | Atualiza um livro |
| DELETE | `/books/{id}` | Remove um livro |

---

## 📖 Documentação

A documentação interativa está disponível através do Swagger.

```
https://api-library-manager-0h69.onrender.com/api-docs
```

---

## 🌐 API Online

```
https://api-library-manager-0h69.onrender.com/books
```

---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/NatsFJ/api-library-manager.git
```

Entre na pasta:

```bash
cd api-library-manager/library-manager/server
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
DATABASE_URL=sua_connection_string
```

Inicie o servidor:

```bash
npm start
```

---

## 📷 Exemplo de Resposta

```json
[
  {
    "id": 1,
    "title": "Código Limpo",
    "author": "Robert C. Martin"
  }
]
```

---

## 📌 Próximas melhorias

- [ ] Autenticação JWT
- [ ] Paginação
- [ ] Busca por título
- [ ] Validação de dados
- [ ] Testes automatizados
- [ ] Docker

---

## 👨‍💻 Autor

**Natanael Félix**

Backend Developer em formação.

[GitHub](https://github.com/NatsFJ)

[LinkedIn](https://www.linkedin.com/)
