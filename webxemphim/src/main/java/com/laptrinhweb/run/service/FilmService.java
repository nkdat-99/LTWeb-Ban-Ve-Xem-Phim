package com.laptrinhweb.run.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhweb.run.model.Film;

@Repository
public interface FilmService extends JpaRepository<Film, Integer> {
	// todo
}