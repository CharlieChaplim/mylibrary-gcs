package com.example.mylibrary.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record EmprestimoRequest(
        @NotNull Long livroId,
        @NotBlank String nomePessoa,
        String telefone,
        @NotNull @FutureOrPresent LocalDate dataDevolucaoPrevista
) {}
