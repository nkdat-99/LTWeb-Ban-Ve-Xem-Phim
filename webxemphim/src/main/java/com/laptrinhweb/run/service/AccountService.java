package com.laptrinhweb.run.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhweb.run.model.Account;

@Repository
public interface AccountService extends JpaRepository<Account, Integer> {
	// todo
}