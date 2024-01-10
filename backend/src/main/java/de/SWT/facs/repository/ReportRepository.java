package de.SWT.facs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.SWT.facs.entities.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    public void deleteByRoomName(String roomName);
    
}
