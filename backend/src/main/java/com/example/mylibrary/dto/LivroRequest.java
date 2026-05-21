package com.example.mylibrary.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LivroRequest(
        @NotBlank String titulo,
        @NotBlank String autor,
        String isbn,
        Integer ano,
        @NotNull Long categoriaId
) {}
