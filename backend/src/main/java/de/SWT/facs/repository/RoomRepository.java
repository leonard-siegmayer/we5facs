package de.SWT.facs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.SWT.facs.entities.Equipment;
import de.SWT.facs.entities.Report;
import de.SWT.facs.entities.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {

    List<Room> findByEquipment(Equipment equipment);

    List<Room> findByTopReports(Report topReport);

}
