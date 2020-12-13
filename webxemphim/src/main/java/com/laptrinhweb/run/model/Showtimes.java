package com.laptrinhweb.run.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Showtimes implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int idfilm;
	private int idroom;
	private String giochieu;
	private Date ngaychieu;

	public Showtimes() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Showtimes(int id, int idfilm, int idroom, String giochieu, Date ngaychieu) {
		super();
		this.id = id;
		this.idfilm = idfilm;
		this.idroom = idroom;
		this.giochieu = giochieu;
		this.ngaychieu = ngaychieu;
	}
	
	public Showtimes(int idfilm, int idroom, String giochieu, Date ngaychieu) {
		super();
		this.idfilm = idfilm;
		this.idroom = idroom;
		this.giochieu = giochieu;
		this.ngaychieu = ngaychieu;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIdfilm() {
		return idfilm;
	}

	public void setIdfilm(int idfilm) {
		this.idfilm = idfilm;
	}

	public int getIdroom() {
		return idroom;
	}

	public void setIdroom(int idroom) {
		this.idroom = idroom;
	}

	public String getGiochieu() {
		return giochieu;
	}

	public void setGiochieu(String giochieu) {
		this.giochieu = giochieu;
	}

	public Date getNgaychieu() {
		return ngaychieu;
	}

	public void setNgaychieu(Date ngaychieu) {
		this.ngaychieu = ngaychieu;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
