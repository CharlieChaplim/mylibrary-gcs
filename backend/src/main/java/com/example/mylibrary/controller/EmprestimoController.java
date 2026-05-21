package com.example.mylibrary.controller;

import com.example.mylibrary.dto.EmprestimoRequest;
import com.example.mylibrary.dto.EmprestimoResponse;
import com.example.mylibrary.service.EmprestimoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {
    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @GetMapping
    public List<EmprestimoResponse> listar() {
        return emprestimoService.listar();
    }

    @GetMapping("/ativos")
    public List<EmprestimoResponse> ativos() {
        return emprestimoService.ativos();
    }

    @GetMapping("/atrasados")
    public List<EmprestimoResponse> atrasados() {
        return emprestimoService.atrasados();
    }

    @PostMapping("/emprestar")
    @ResponseStatus(HttpStatus.CREATED)
    public EmprestimoResponse emprestar(@RequestBody @Valid EmprestimoRequest request) {
        return emprestimoService.emprestar(request);
    }

    @PostMapping("/{id}/devolver")
    public EmprestimoResponse devolver(@PathVariable Long id) {
        return emprestimoService.devolver(id);
    }
}
