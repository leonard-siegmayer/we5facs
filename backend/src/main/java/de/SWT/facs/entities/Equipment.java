package de.SWT.facs.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import de.SWT.facs.entities.converters.StringListConverter;

@Entity
@Table(name = "equipment")
public class Equipment {

	@Id
	@Column(name = "id", nullable = false)
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(name = "roleInCharge")
	private Role roleInCharge;

	@ElementCollection
	@Column(name = "problemTypes")
	@Enumerated(EnumType.STRING)
	@Convert(converter = StringListConverter.class)
	private List<ProblemType> problemTypes;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ProblemType> getProblemTypes() {
		return problemTypes;
	}

	public void setProblemTypes(List<ProblemType> problemTypes) {
		this.problemTypes = problemTypes;
	}

	public Role getRoleInCharge() {
		return roleInCharge;
	}

	public void setRoleInCharge(Role roleInCharge) {
		this.roleInCharge = roleInCharge;
	}

	@Override
	public String toString() {
		return "Equipment [name=" + name + ", problemTypes=" + problemTypes + ", roleInCharge=" + roleInCharge + "]";
	}
}
