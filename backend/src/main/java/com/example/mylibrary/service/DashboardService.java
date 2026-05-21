package com.example.mylibrary.service;

import com.example.mylibrary.dto.DashboardResponse;
import com.example.mylibrary.entity.StatusLivro;
import com.example.mylibrary.repository.EmprestimoRepository;
import com.example.mylibrary.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DashboardService {
    private final LivroRepository livroRepository;
    private final EmprestimoRepository emprestimoRepository;
    private final EmprestimoService emprestimoService;

    public DashboardService(LivroRepository livroRepository, EmprestimoRepository emprestimoRepository, EmprestimoService emprestimoService) {
        this.livroRepository = livroRepository;
        this.emprestimoRepository = emprestimoRepository;
        this.emprestimoService = emprestimoService;
    }

    @Transactional(readOnly = true)
    public DashboardResponse obter() {
        return new DashboardResponse(
                livroRepository.count(),
                livroRepository.countByStatus(StatusLivro.DISPONIVEL),
                livroRepository.countByStatus(StatusLivro.EMPRESTADO),
                emprestimoRepository.countByDataDevolucaoEfetivaIsNull(),
                emprestimoRepository.findTop5ByOrderByDataEmprestimoDescIdDesc().stream().map(emprestimoService::toResponse).toList()
        );
    }
}
