package de.SWT.facs.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "room")
public class Room {

	@Id
	@Column(name = "name", nullable = false)
	private String name;

	@ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
	@Column(name = "equipment")
	private List<Equipment> equipment;

	@ManyToMany(cascade = CascadeType.PERSIST)
	@Column(name = "topReports")
	private List<Report> topReports;

	public Room() {
	}

	public Room(String name, List<Equipment> equipment) {
		this.name = name;
		this.equipment = equipment;
		this.topReports = new ArrayList<Report>();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Equipment> getEquipment() {
		return equipment;
	}

	public void setEquipment(List<Equipment> equipment) {
		this.equipment = equipment;
	}

	public List<Report> getTopReports() {
		return topReports;
	}

	public void setTopReports(List<Report> topReports) {
		this.topReports = topReports;
	}

	@Override
	public String toString() {
		return "Room [equipment=" + equipment + ", name=" + name + ", topReports=" + topReports + "]";
	}

}
