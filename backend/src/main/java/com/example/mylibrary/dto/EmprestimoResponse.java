package com.example.mylibrary.dto;

import java.time.LocalDate;

public record EmprestimoResponse(
        Long id,
        Long livroId,
        String livroTitulo,
        String nomePessoa,
        String telefone,
        LocalDate dataEmprestimo,
        LocalDate dataDevolucaoPrevista,
        LocalDate dataDevolucaoEfetiva,
        boolean atrasado,
        long diasAtraso
) {}
