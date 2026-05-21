package com.example.mylibrary.repository;

import com.example.mylibrary.entity.Livro;
import com.example.mylibrary.entity.StatusLivro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    long countByCategoriaId(Long categoriaId);
    long countByStatus(StatusLivro status);

    @Query("""
            SELECT l FROM Livro l
            WHERE (:categoriaId IS NULL OR l.categoria.id = :categoriaId)
              AND (:status IS NULL OR l.status = :status)
              AND (:busca IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :busca, '%'))
                   OR LOWER(l.autor) LIKE LOWER(CONCAT('%', :busca, '%')))
            ORDER BY l.titulo ASC
            """)
    List<Livro> filtrar(@Param("categoriaId") Long categoriaId,
                        @Param("status") StatusLivro status,
                        @Param("busca") String busca);
}
