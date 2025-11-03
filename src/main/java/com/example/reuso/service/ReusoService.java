package com.example.reuso.service;

import com.example.reuso.model.Garrafa;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReusoService {

    private Garrafa tanque1 = new Garrafa(60.0);
    private Garrafa tanque2 = new Garrafa(40.0);

    public List<Garrafa> getNiveis() {
        return List.of(tanque1, tanque2);
    }

    public void atualizarSimulacao() {
        if (tanque1.getNivel() > 30) {
            tanque1.setNivel(tanque1.getNivel() - 1.5);
            tanque2.setNivel(tanque2.getNivel() + 1.5);
        }
    }

    public void reiniciar() {
        tanque1.setNivel(60.0);
        tanque2.setNivel(40.0);
    }
}
