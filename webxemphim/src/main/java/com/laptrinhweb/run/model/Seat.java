package com.laptrinhweb.run.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Seat implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private int status;
	private int idroom;

	public Seat() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Seat(int id, String name, int status, int idroom) {
		super();
		this.id = id;
		this.name = name;
		this.status = status;
		this.idroom = idroom;
	}
	
	public Seat(String name, int status, int idroom) {
		super();
		this.name = name;
		this.status = status;
		this.idroom = idroom;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getIdroom() {
		return idroom;
	}

	public void setIdroom(int idroom) {
		this.idroom = idroom;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}