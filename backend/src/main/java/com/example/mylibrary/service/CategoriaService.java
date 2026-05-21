package com.example.mylibrary.service;

import com.example.mylibrary.dto.CategoriaRequest;
import com.example.mylibrary.dto.CategoriaResponse;
import com.example.mylibrary.entity.Categoria;
import com.example.mylibrary.exception.BusinessException;
import com.example.mylibrary.exception.NotFoundException;
import com.example.mylibrary.repository.CategoriaRepository;
import com.example.mylibrary.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;
    private final LivroRepository livroRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, LivroRepository livroRepository) {
        this.categoriaRepository = categoriaRepository;
        this.livroRepository = livroRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoriaResponse> listar() {
        return categoriaRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional
    public CategoriaResponse criar(CategoriaRequest request) {
        if (categoriaRepository.existsByNomeIgnoreCase(request.nome())) {
            throw new BusinessException("Já existe uma categoria com esse nome.");
        }
        Categoria categoria = new Categoria(request.nome().trim(), request.descricao());
        return toResponse(categoriaRepository.save(categoria));
    }

    @Transactional
    public void excluir(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada."));
        if (livroRepository.countByCategoriaId(id) > 0) {
            throw new BusinessException("Não é possível excluir categoria com livros vinculados.");
        }
        categoriaRepository.delete(categoria);
    }

    private CategoriaResponse toResponse(Categoria categoria) {
        return new CategoriaResponse(
                categoria.getId(),
                categoria.getNome(),
                categoria.getDescricao(),
                livroRepository.countByCategoriaId(categoria.getId())
        );
    }
}
