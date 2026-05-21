package com.example.mylibrary.controller;

import com.example.mylibrary.dto.EmprestimoResponse;
import com.example.mylibrary.dto.LivroRequest;
import com.example.mylibrary.dto.LivroResponse;
import com.example.mylibrary.entity.StatusLivro;
import com.example.mylibrary.service.EmprestimoService;
import com.example.mylibrary.service.LivroService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
public class LivroController {
    private final LivroService livroService;
    private final EmprestimoService emprestimoService;

    public LivroController(LivroService livroService, EmprestimoService emprestimoService) {
        this.livroService = livroService;
        this.emprestimoService = emprestimoService;
    }

    @GetMapping
    public List<LivroResponse> listar(@RequestParam(required = false) Long categoriaId,
                                      @RequestParam(required = false) StatusLivro status,
                                      @RequestParam(required = false) String busca) {
        return livroService.listar(categoriaId, status, busca);
    }

    @GetMapping("/{id}")
    public LivroResponse buscar(@PathVariable Long id) {
        return livroService.buscarPorId(id);
    }

    @GetMapping("/{id}/emprestimos")
    public List<EmprestimoResponse> historico(@PathVariable Long id) {
        return emprestimoService.historicoPorLivro(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LivroResponse criar(@RequestBody @Valid LivroRequest request) {
        return livroService.criar(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        livroService.excluir(id);
    }
}
