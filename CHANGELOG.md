# Changelog

## [1.0.1] - 2026-05-21

### Fixed
- Corrigida validação para impedir exclusão de livro emprestado (#4).

## [1.0.0] - 2026-05-21

### Added
- RF01: CRUD Categorias com validação de exclusão (#1).
- RF02: CRUD Livros com filtros, status e vínculo com categoria (#2).
- RF03: Sistema de empréstimos com emprestar/devolver (#3).
- Pipeline CI com build backend Maven e frontend Angular.
- Status automático: DISPONIVEL ↔ EMPRESTADO.

### Technical
- Entidades Categoria, Livro e Emprestimo.
- Service Layer com regras de negócio.
- DTOs, JPA, H2 e tratamento de exceções.
- Branches main, develop, feature, release e hotfix.

## [0.1.0] - 2026-05-21

### Added
- Baseline inicial do repositório.
- Estrutura base backend e frontend.