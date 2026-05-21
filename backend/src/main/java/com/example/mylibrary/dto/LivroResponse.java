package com.example.mylibrary.dto;

import com.example.mylibrary.entity.StatusLivro;

public record LivroResponse(
        Long id,
        String titulo,
        String autor,
        String isbn,
        Integer ano,
        StatusLivro status,
        Long categoriaId,
        String categoriaNome
) {}
