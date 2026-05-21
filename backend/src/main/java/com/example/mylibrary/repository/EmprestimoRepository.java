package com.example.mylibrary.repository;

import com.example.mylibrary.entity.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByLivroIdOrderByDataEmprestimoDesc(Long livroId);
    List<Emprestimo> findByDataDevolucaoEfetivaIsNullOrderByDataDevolucaoPrevistaAsc();
    List<Emprestimo> findByDataDevolucaoEfetivaIsNullAndDataDevolucaoPrevistaBeforeOrderByDataDevolucaoPrevistaAsc(LocalDate hoje);
    List<Emprestimo> findTop5ByOrderByDataEmprestimoDescIdDesc();
    long countByDataDevolucaoEfetivaIsNull();
}
