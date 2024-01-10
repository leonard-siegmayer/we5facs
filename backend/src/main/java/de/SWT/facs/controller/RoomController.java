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

import de.SWT.facs.entities.Room;
import de.SWT.facs.entities.reqres.JsonResponse;
import de.SWT.facs.services.RoomService;

@CrossOrigin
@RequestMapping("/rooms")
@RestController
public class RoomController {

    @Autowired
    RoomService roomService;

    @GetMapping("/get")
    public List<Room> getRooms() {
        return roomService.getRooms();
    }

    @GetMapping("/get/{name}")
    public Room getRoom(@PathVariable String name) {
        return roomService.getRoom(name);
    }

    /**
     * Saves or updates a given room. Also saves its equipment and topReports if
     * they do not yet exist.
     * 
     * @param room the room to be saved
     * @return A JsonResponse including the status of the request. (200 if
     *         successfull, 500 if something went wrong)
     */
    @Transactional
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MEDIENTECHNIK', 'ROLE_REINIGUNGSFIRMA', 'ROLE_RECHENZENTRUM', 'ROLE_HAUSVERWALTUNG')")
    @PostMapping
    public JsonResponse saveRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    /**
     * Deletes a room and all reports belonging to it. Equipment and topReports
     * which no other room has will also be deleted.
     * 
     * @param name The name of the room
     * @return A JsonResponse including the status of the request. (200 if
     *         successfull, 500 if something went wrong)
     */
    @Transactional
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MEDIENTECHNIK', 'ROLE_REINIGUNGSFIRMA', 'ROLE_RECHENZENTRUM', 'ROLE_HAUSVERWALTUNG')")
    @DeleteMapping("/{name}")
    public JsonResponse deleteRoom(@PathVariable String name) {
        return roomService.deleteRoom(name);
    }

}
