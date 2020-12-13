package com.laptrinhweb.run.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhweb.run.model.Book;

@Repository
public interface BookService extends JpaRepository<Book, Integer> {
	// todo
}