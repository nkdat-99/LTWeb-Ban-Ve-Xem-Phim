package com.laptrinhweb.run.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Room implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private int slg;
	private int idcinema;

	public Room() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Room(int id, String name, int slg, int idcinema) {
		super();
		this.id = id;
		this.name = name;
		this.slg = slg;
		this.idcinema = idcinema;
	}
	
	public Room(String name, int slg, int idcinema) {
		super();
		this.name = name;
		this.slg = slg;
		this.idcinema = idcinema;
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

	public int getSlg() {
		return slg;
	}

	public void setSlg(int slg) {
		this.slg = slg;
	}

	public int getIdcinema() {
		return idcinema;
	}

	public void setIdcinema(int idcinema) {
		this.idcinema = idcinema;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
