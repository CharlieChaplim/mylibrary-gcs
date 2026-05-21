package com.example.mylibrary.service;

import com.example.mylibrary.dto.LivroRequest;
import com.example.mylibrary.dto.LivroResponse;
import com.example.mylibrary.entity.Categoria;
import com.example.mylibrary.entity.Livro;
import com.example.mylibrary.entity.StatusLivro;
import com.example.mylibrary.exception.BusinessException;
import com.example.mylibrary.exception.NotFoundException;
import com.example.mylibrary.repository.CategoriaRepository;
import com.example.mylibrary.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LivroService {
    private final LivroRepository livroRepository;
    private final CategoriaRepository categoriaRepository;

    public LivroService(LivroRepository livroRepository, CategoriaRepository categoriaRepository) {
        this.livroRepository = livroRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional(readOnly = true)
    public List<LivroResponse> listar(Long categoriaId, StatusLivro status, String busca) {
        String buscaTratada = busca == null || busca.isBlank() ? null : busca.trim();
        return livroRepository.filtrar(categoriaId, status, buscaTratada).stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public LivroResponse buscarPorId(Long id) {
        return toResponse(getLivro(id));
    }

    @Transactional
    public LivroResponse criar(LivroRequest request) {
        Categoria categoria = categoriaRepository.findById(request.categoriaId())
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada."));
        Livro livro = new Livro();
        livro.setTitulo(request.titulo().trim());
        livro.setAutor(request.autor().trim());
        livro.setIsbn(request.isbn());
        livro.setAno(request.ano());
        livro.setCategoria(categoria);
        livro.setStatus(StatusLivro.DISPONIVEL);
        return toResponse(livroRepository.save(livro));
    }

    @Transactional
    public void excluir(Long id) {
        Livro livro = getLivro(id);
        if (livro.getStatus() != StatusLivro.DISPONIVEL) {
            throw new BusinessException("Não é possível excluir livro emprestado.");
        }
        livroRepository.delete(livro);
    }

    @Transactional(readOnly = true)
    public Livro getLivro(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Livro não encontrado."));
    }

    public LivroResponse toResponse(Livro livro) {
        return new LivroResponse(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor(),
                livro.getIsbn(),
                livro.getAno(),
                livro.getStatus(),
                livro.getCategoria().getId(),
                livro.getCategoria().getNome()
        );
    }
}
