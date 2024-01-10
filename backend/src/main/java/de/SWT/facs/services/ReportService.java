package de.SWT.facs.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.SWT.facs.entities.ProblemType;
import de.SWT.facs.entities.Report;
import de.SWT.facs.entities.Role;
import de.SWT.facs.entities.User;
import de.SWT.facs.entities.reqres.JsonResponse;
import de.SWT.facs.repository.ReportRepository;

@Service
public class ReportService {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    UserService userService;

    public ReportService() {
    }

    /**
     * Returns the reports belonging to a given user as a list.
     * 
     * @param userId the id of the user
     * @return a list of reports
     */
    public List<Report> getReports(String userId) {

        Optional<User> user = userService.findUserById(userId);
        List<Report> allReports = reportRepository.findAll();
        if (!user.isPresent()) {
            allReports.clear();
            return allReports;
        }

        Role role = user.get().getRole();

        switch (role) {
        case ROLE_ADMIN:
            // return all reports without filerting
            break;
        case ROLE_REINIGUNGSFIRMA:
            allReports.removeIf(r -> r.getType() != ProblemType.CLEAN);
            break;
        default:
            allReports.removeIf(r -> r.getEquipment().getRoleInCharge() != role);
            break;
        }
        return allReports;
    }

    public Report getReport(int id) {
        Optional<Report> report = reportRepository.findById(id);
        if (!report.isPresent()) {
            return null;
        }
        return report.get();
    }

    public JsonResponse saveReport(Report report) {
        try {
            reportRepository.save(report);
            return new JsonResponse(200, "Report succesfully saved");
        } catch (IllegalArgumentException e) {
            return new JsonResponse(500, e.getMessage());
        }
    }

    public JsonResponse deleteReport(int id) {
        try {
            reportRepository.deleteById(id);
            return new JsonResponse(200, "Report succesfully deleted");
        } catch (IllegalArgumentException e) {
            return new JsonResponse(500, e.getMessage());
        }
    }

    public void deleteByRoomName(String roomName) {
        reportRepository.deleteByRoomName(roomName);
    }
}
