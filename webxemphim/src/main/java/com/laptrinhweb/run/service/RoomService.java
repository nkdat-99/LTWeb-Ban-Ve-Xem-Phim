package com.laptrinhweb.run.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhweb.run.model.Room;

@Repository
public interface RoomService extends JpaRepository<Room, Integer> {
	// todo
}