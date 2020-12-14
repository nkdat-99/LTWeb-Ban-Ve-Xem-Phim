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
public class Book implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int idaccount;
	private int idshowtimes;
	private int idseat;
	private String pay_way;
	private float total;
	private Date date_pay;

	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Book(int id, int idaccount, int idshowtimes, int idseat, String pay_way, float total, Date date_pay) {
		super();
		this.id = id;
		this.idaccount = idaccount;
		this.idshowtimes = idshowtimes;
		this.idseat = idseat;
		this.pay_way = pay_way;
		this.total = total;
		this.date_pay = date_pay;
	}

	public Book(int idaccount, int idshowtimes, int idseat, String pay_way, float total, Date date_pay) {
		super();
		this.idaccount = idaccount;
		this.idshowtimes = idshowtimes;
		this.idseat = idseat;
		this.pay_way = pay_way;
		this.total = total;
		this.date_pay = date_pay;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIdaccount() {
		return idaccount;
	}

	public void setIdaccount(int idaccount) {
		this.idaccount = idaccount;
	}

	public int getIdshowtimes() {
		return idshowtimes;
	}

	public void setIdshowtimes(int idshowtimes) {
		this.idshowtimes = idshowtimes;
	}

	public int getIdseat() {
		return idseat;
	}

	public void setIdseat(int idseat) {
		this.idseat = idseat;
	}

	public String getPay_way() {
		return pay_way;
	}

	public void setPay_way(String pay_way) {
		this.pay_way = pay_way;
	}

	public float getTotal() {
		return total;
	}

	public void setTotal(float total) {
		this.total = total;
	}

	public Date getDate_pay() {
		return date_pay;
	}

	public void setDate_pay(Date date_pay) {
		this.date_pay = date_pay;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}