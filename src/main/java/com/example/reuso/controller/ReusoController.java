package com.example.reuso.controller;

import com.example.reuso.model.Garrafa;
import com.example.reuso.service.ReusoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // permite acesso do frontend
public class ReusoController {

    private final ReusoService reusoService;

    public ReusoController(ReusoService reusoService) {
        this.reusoService = reusoService;
    }

    @GetMapping("/tanques")
    public List<Garrafa> getNiveis() {
        return reusoService.getNiveis();
    }

    @PostMapping("/simular")
    public List<Garrafa> simular() {
        reusoService.atualizarSimulacao();
        return reusoService.getNiveis();
    }

    @PostMapping("/reiniciar")
    public List<Garrafa> reiniciar() {
        reusoService.reiniciar();
        return reusoService.getNiveis();
    }
}
