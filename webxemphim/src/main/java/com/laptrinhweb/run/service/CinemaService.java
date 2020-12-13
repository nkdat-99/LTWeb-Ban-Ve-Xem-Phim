package com.laptrinhweb.run.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhweb.run.model.Cinema;

@Repository
public interface CinemaService extends JpaRepository<Cinema, Integer> {
	// todo
}