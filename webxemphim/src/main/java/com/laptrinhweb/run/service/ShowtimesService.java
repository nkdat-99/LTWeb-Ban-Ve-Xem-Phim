package com.laptrinhweb.run.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhweb.run.model.Showtimes;

@Repository
public interface ShowtimesService extends JpaRepository<Showtimes, Integer> {
	// todo
}