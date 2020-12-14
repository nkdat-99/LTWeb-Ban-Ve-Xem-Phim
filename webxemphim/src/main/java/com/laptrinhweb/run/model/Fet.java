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
public class Fet implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String filmname;
	private String time;
	private Date date;
	private String roomname;
	private String seatname;
	private float total;

	public Fet() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Fet(int id, String name, String filmname, String time, Date date, String roomname, String seatname,
			float total) {
		super();
		this.id = id;
		this.name = name;
		this.filmname = filmname;
		this.time = time;
		this.date = date;
		this.roomname = roomname;
		this.seatname = seatname;
		this.total = total;
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

	public String getFilmname() {
		return filmname;
	}

	public void setFilmname(String filmname) {
		this.filmname = filmname;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getRoomname() {
		return roomname;
	}

	public void setRoomname(String roomname) {
		this.roomname = roomname;
	}

	public String getSeatname() {
		return seatname;
	}

	public void setSeatname(String seatname) {
		this.seatname = seatname;
	}

	public float getTotal() {
		return total;
	}

	public void setTotal(float total) {
		this.total = total;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
