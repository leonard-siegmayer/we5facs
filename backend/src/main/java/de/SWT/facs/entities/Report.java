package de.SWT.facs.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

@Entity
@Table(name = "report")
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "description")
	private String description;

	@Column(name = "email")
	private String email;

	@Column(name = "note")
	private String note;

	@Column(name = "roomName")
	private String roomName;

	@ManyToOne
	@OneToMany
	@JoinColumn(name = "equipment", nullable = false)
	private Equipment equipment;

	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private ReportStatus status;

	@Column(name = "date")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@JsonSerialize(using = LocalDateSerializer.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	private LocalDate date;

	@Column(name = "type")
	@Enumerated(EnumType.STRING)
	private ProblemType type;

	@Column(name = "priority")
	@Enumerated(EnumType.STRING)
	private ReportPriority priority;

	public Report() {
		this.date = LocalDate.now();
		this.priority = ReportPriority.MEDIUM;
	}

	public Report(String roomName, Equipment equipment, String description, String email, String note,
			ReportStatus status, ProblemType type, ReportPriority priority) {
		this.description = description;
		this.email = email;
		this.note = note;
		this.roomName = roomName;
		this.equipment = equipment;
		this.date = LocalDate.now();
		this.type = type;
		this.status = status;
		if (priority == null) {
			this.priority = ReportPriority.MEDIUM;
		} else {
			this.priority = priority;
		}
	}

	public Report(int id, String roomName, Equipment equipment, String description, String email, String note,
			ReportPriority priority) {
		this.id = id;
		this.description = description;
		this.email = email;
		this.note = note;
		this.roomName = roomName;
		this.equipment = equipment;
		this.priority = priority;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public Equipment getEquipment() {
		return equipment;
	}

	public void setEquipment(Equipment equipment) {
		this.equipment = equipment;
	}

	public ReportStatus getStatus() {
		return status;
	}

	public void setStatus(ReportStatus status) {
		this.status = status;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public ProblemType getType() {
		return type;
	}

	public void setType(ProblemType type) {
		this.type = type;
	}

	public ReportPriority getPriority() {
		return priority;
	}

	public void setPriority(ReportPriority priority) {
		this.priority = priority;
	}

	@Override
	public String toString() {
		return "Report [date=" + date + ", description=" + description + ", email=" + email + ", equipment=" + equipment
				+ ", id=" + id + ", note=" + note + ", priority=" + priority + ", roomName=" + roomName + ", status="
				+ status + ", type=" + type + "]";
	}
}
