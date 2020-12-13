package com.laptrinhweb.run.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Film implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private int time;
	private float price;
	private String styles;

	public Film() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Film(int id, String name, int time, float price, String styles) {
		super();
		this.id = id;
		this.name = name;
		this.time = time;
		this.price = price;
		this.styles = styles;
	}
	
	public Film(String name, int time, float price, String styles) {
		super();
		this.name = name;
		this.time = time;
		this.price = price;
		this.styles = styles;
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

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getStyles() {
		return styles;
	}

	public void setStyles(String styles) {
		this.styles = styles;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}