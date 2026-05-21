INSERT INTO categorias (nome, descricao) VALUES ('Ficção', 'Romances e fantasia');
INSERT INTO categorias (nome, descricao) VALUES ('Técnico', 'Livros de tecnologia e estudo');
INSERT INTO categorias (nome, descricao) VALUES ('Biografia', 'Histórias de vida');

INSERT INTO livros (titulo, autor, isbn, ano, status, categoria_id)
VALUES ('O Hobbit', 'J. R. R. Tolkien', '9788595084742', 1937, 'DISPONIVEL', (SELECT id FROM categorias WHERE nome = 'Ficção'));

INSERT INTO livros (titulo, autor, isbn, ano, status, categoria_id)
VALUES ('Clean Code', 'Robert C. Martin', '9780132350884', 2008, 'DISPONIVEL', (SELECT id FROM categorias WHERE nome = 'Técnico'));

INSERT INTO livros (titulo, autor, isbn, ano, status, categoria_id)
VALUES ('Steve Jobs', 'Walter Isaacson', '9781451648539', 2011, 'DISPONIVEL', (SELECT id FROM categorias WHERE nome = 'Biografia'));
