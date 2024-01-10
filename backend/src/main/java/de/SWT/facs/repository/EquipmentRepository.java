package de.SWT.facs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.SWT.facs.entities.Equipment;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, String> {

}
