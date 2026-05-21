package com.example.mylibrary.service;

import com.example.mylibrary.dto.EmprestimoRequest;
import com.example.mylibrary.dto.EmprestimoResponse;
import com.example.mylibrary.entity.Emprestimo;
import com.example.mylibrary.entity.Livro;
import com.example.mylibrary.entity.StatusLivro;
import com.example.mylibrary.exception.BusinessException;
import com.example.mylibrary.exception.NotFoundException;
import com.example.mylibrary.repository.EmprestimoRepository;
import com.example.mylibrary.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class EmprestimoService {
    private final EmprestimoRepository emprestimoRepository;
    private final LivroRepository livroRepository;

    public EmprestimoService(EmprestimoRepository emprestimoRepository, LivroRepository livroRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
    }

    @Transactional(readOnly = true)
    public List<EmprestimoResponse> listar() {
        return emprestimoRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<EmprestimoResponse> ativos() {
        return emprestimoRepository.findByDataDevolucaoEfetivaIsNullOrderByDataDevolucaoPrevistaAsc().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<EmprestimoResponse> atrasados() {
        return emprestimoRepository
                .findByDataDevolucaoEfetivaIsNullAndDataDevolucaoPrevistaBeforeOrderByDataDevolucaoPrevistaAsc(LocalDate.now())
                .stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<EmprestimoResponse> historicoPorLivro(Long livroId) {
        return emprestimoRepository.findByLivroIdOrderByDataEmprestimoDesc(livroId).stream().map(this::toResponse).toList();
    }

    @Transactional
    public EmprestimoResponse emprestar(EmprestimoRequest request) {
        Livro livro = livroRepository.findById(request.livroId())
                .orElseThrow(() -> new NotFoundException("Livro não encontrado."));
        if (livro.getStatus() != StatusLivro.DISPONIVEL) {
            throw new BusinessException("Livro já está emprestado.");
        }
        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setLivro(livro);
        emprestimo.setNomePessoa(request.nomePessoa().trim());
        emprestimo.setTelefone(request.telefone());
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataDevolucaoPrevista(request.dataDevolucaoPrevista());
        livro.setStatus(StatusLivro.EMPRESTADO);
        livroRepository.save(livro);
        return toResponse(emprestimoRepository.save(emprestimo));
    }

    @Transactional
    public EmprestimoResponse devolver(Long id) {
        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Empréstimo não encontrado."));
        if (emprestimo.getDataDevolucaoEfetiva() != null) {
            throw new BusinessException("Este empréstimo já foi devolvido.");
        }
        Livro livro = emprestimo.getLivro();
        if (livro.getStatus() == StatusLivro.DISPONIVEL) {
            throw new BusinessException("Não é possível devolver um livro disponível.");
        }
        emprestimo.setDataDevolucaoEfetiva(LocalDate.now());
        livro.setStatus(StatusLivro.DISPONIVEL);
        livroRepository.save(livro);
        return toResponse(emprestimoRepository.save(emprestimo));
    }

    public EmprestimoResponse toResponse(Emprestimo emprestimo) {
        LocalDate hoje = LocalDate.now();
        boolean atrasado = emprestimo.getDataDevolucaoEfetiva() == null && emprestimo.getDataDevolucaoPrevista().isBefore(hoje);
        long diasAtraso = atrasado ? ChronoUnit.DAYS.between(emprestimo.getDataDevolucaoPrevista(), hoje) : 0;
        return new EmprestimoResponse(
                emprestimo.getId(),
                emprestimo.getLivro().getId(),
                emprestimo.getLivro().getTitulo(),
                emprestimo.getNomePessoa(),
                emprestimo.getTelefone(),
                emprestimo.getDataEmprestimo(),
                emprestimo.getDataDevolucaoPrevista(),
                emprestimo.getDataDevolucaoEfetiva(),
                atrasado,
                diasAtraso
        );
    }
}
