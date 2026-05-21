# MyLibrary v1.0

Sistema completo de biblioteca pessoal com backend Spring Boot e frontend Angular.

## Funcionalidades entregues

- CRUD de categorias.
- CRUD de livros vinculados a categorias.
- Status automático do livro: `DISPONIVEL` / `EMPRESTADO`.
- Registro de empréstimos e devoluções.
- Histórico de empréstimos por livro.
- Filtros por categoria, status e busca por título/autor.
- Dashboard com estatísticas do acervo.
- Relatório de empréstimos atrasados.
- Service Layer com regras de negócio.
- DTOs, JPA, H2 e tratamento simples de erros.

## Como rodar o backend

Pré-requisitos:

- Java 17
- Maven 3.9+

Comandos:

```bash
cd backend
mvn spring-boot:run
```

Backend disponível em:

```text
http://localhost:8080
```

Console H2:

```text
http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:mylibrary
User: sa
Password: deixe vazio
```

## Como rodar o frontend

Pré-requisitos:

- Node.js 20+
- Angular CLI 17+

Comandos:

```bash
cd frontend
npm install
npm start
```

Frontend disponível em:

```text
http://localhost:4200
```

## Endpoints principais

Categorias:

```text
GET    /api/categorias
POST   /api/categorias
DELETE /api/categorias/{id}
```

Livros:

```text
GET    /api/livros?categoriaId=&status=&busca=
GET    /api/livros/{id}
GET    /api/livros/{id}/emprestimos
POST   /api/livros
DELETE /api/livros/{id}
```

Empréstimos:

```text
GET  /api/emprestimos
GET  /api/emprestimos/ativos
GET  /api/emprestimos/atrasados
POST /api/emprestimos/emprestar
POST /api/emprestimos/{id}/devolver
```

Dashboard:

```text
GET /api/dashboard
```

## Regras de negócio implementadas

- Nome de categoria deve ser único.
- Categoria com livros vinculados não pode ser excluída.
- Livro sempre nasce como `DISPONIVEL`.
- Livro emprestado não pode ser excluído.
- Emprestar livro muda status para `EMPRESTADO`.
- Devolver livro muda status para `DISPONIVEL`.
- Não permite emprestar livro já emprestado.
- Não permite devolver empréstimo já devolvido.
- Empréstimo atrasado = data prevista menor que hoje e data efetiva nula.

## Tarefa adicional no GitHub

Sim. Depois de validar localmente, subir para o GitHub com um README e commits separados:

```bash
git init
git add .
git commit -m "feat: cria backend Spring Boot do MyLibrary"
git commit --allow-empty -m "docs: adiciona instrucoes de execucao"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

Se o professor exigir entrega pelo GitHub, crie um repositório chamado `mylibrary` e envie o link junto do `.zip`.
