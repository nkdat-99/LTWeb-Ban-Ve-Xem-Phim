package com.laptrinhweb.run.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Cinema implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String address;
	private String hotline;

	public Cinema() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Cinema(int id, String name, String address, String hotline) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.hotline = hotline;
	}
	
	public Cinema(String name, String address, String hotline) {
		super();
		this.name = name;
		this.address = address;
		this.hotline = hotline;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getHotline() {
		return hotline;
	}

	public void setHotline(String hotline) {
		this.hotline = hotline;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}