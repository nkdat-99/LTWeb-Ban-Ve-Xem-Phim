package com.laptrinhweb.run.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhweb.run.model.Seat;

@Repository
public interface SeatService extends JpaRepository<Seat, Integer> {
	// todo
}