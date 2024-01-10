package de.SWT.facs.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.SWT.facs.entities.Equipment;
import de.SWT.facs.entities.Report;
import de.SWT.facs.entities.Room;
import de.SWT.facs.entities.reqres.JsonResponse;
import de.SWT.facs.repository.RoomRepository;

@Service
public class RoomService {

    @Autowired
    EquipmentService equipmentService;

    @Autowired
    ReportService reportService;

    @Autowired
    RoomRepository roomRepository;

    public RoomService() {
    }

    public List<Room> getRooms() {
        return roomRepository.findAll();
    }

    public Room getRoom(String name) {
        return roomRepository.findById(name).orElseGet(() -> null);
    }

    /**
     * Saves or updates a given room. Also saves its equipment and topReports if
     * they do not yet exist.
     * 
     * @param room the room to be saved
     * @return A JsonResponse including the status of the request. (200 if
     *         successfull, 500 if something went wrong)
     */
    public JsonResponse saveRoom(Room room) {
        try {
            // save equipment if it does not yet exist
            for (Equipment e : room.getEquipment()) {
                equipmentService.saveEquipment(e);
            }
            // save topReport if it does not yet exist
            for (Report r : room.getTopReports()) {
                reportService.saveReport(r);
            }

            roomRepository.save(room);
            return new JsonResponse(200, "Report succesfully saved");
        } catch (IllegalArgumentException e) {
            return new JsonResponse(500, e.getMessage());
        }
    }

    /**
     * Deletes a room and all reports belonging to it. Equipment and topReports
     * which no other room has will also be deleted.
     * 
     * @param name The name of the room
     * @return A JsonResponse including the status of the request. (200 if
     *         successfull, 500 if something went wrong)
     */
    public JsonResponse deleteRoom(String name) {
        try {
            if (!roomRepository.existsById(name)) {
                return new JsonResponse(500, "Room does not exist");
            }

            Room room = roomRepository.findById(name).get();
            List<Report> topReports = room.getTopReports();
            List<Equipment> equipment = room.getEquipment();

            roomRepository.deleteById(name);
            reportService.deleteByRoomName(room.getName());

            // delete top-reports belonging to this room, if no other room uses them
            for (Report r : topReports) {
                if (roomRepository.findByTopReports(r).size() == 0) {
                    reportService.deleteReport(r.getId());
                }
            }

            // delete equipment belonging to this room, if no other room uses them
            for (Equipment e : equipment) {
                if (roomRepository.findByEquipment(e).size() == 0) {
                    equipmentService.deleteEquipment(e.getName());
                }
            }
            return new JsonResponse(200, "Room succesfully deleted");
        } catch (IllegalArgumentException e) {
            return new JsonResponse(500, e.getMessage());
        }
    }
}
