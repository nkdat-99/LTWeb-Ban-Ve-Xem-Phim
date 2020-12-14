package com.laptrinhweb.run.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhweb.run.model.Fet;

@Repository
public interface FetService extends JpaRepository<Fet, Integer> {
	// todo
}