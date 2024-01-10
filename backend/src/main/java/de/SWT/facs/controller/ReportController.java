package de.SWT.facs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.SWT.facs.entities.Report;
import de.SWT.facs.entities.reqres.JsonResponse;
import de.SWT.facs.repository.ReportRepository;
import de.SWT.facs.repository.UserRepository;
import de.SWT.facs.services.ReportService;

@CrossOrigin
@RequestMapping("/reports")
@RestController
public class ReportController {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReportService reportService;

    @Transactional
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MEDIENTECHNIK', 'ROLE_REINIGUNGSFIRMA', 'ROLE_RECHENZENTRUM', 'ROLE_HAUSVERWALTUNG')")
    @GetMapping("/{id}")
    public List<Report> getReports(@PathVariable(value = "id") String userId) {
        return reportService.getReports(userId);
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MEDIENTECHNIK', 'ROLE_REINIGUNGSFIRMA', 'ROLE_RECHENZENTRUM', 'ROLE_HAUSVERWALTUNG')")
    public Report getReport(@PathVariable int id) {
        return reportService.getReport(id);
    }

    @Transactional
    @PostMapping("/save")
    public JsonResponse saveReport(@RequestBody Report report) {
        return reportService.saveReport(report);
    }

    @Transactional
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public JsonResponse deleteReport(@PathVariable int id) {
        return reportService.deleteReport(id);
    }
}
