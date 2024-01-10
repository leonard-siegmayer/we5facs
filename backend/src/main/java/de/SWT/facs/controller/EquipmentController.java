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

import de.SWT.facs.entities.Equipment;
import de.SWT.facs.entities.reqres.JsonResponse;
import de.SWT.facs.services.EquipmentService;

@CrossOrigin
@RequestMapping("/equipment")
@RestController
public class EquipmentController {

    @Autowired
    EquipmentService equipmentService;

    @GetMapping
    public List<Equipment> getEquipment() {
        return equipmentService.getEquipment();
    }

    @GetMapping("/get/{name}")
    public Equipment getEquipment(@PathVariable String name) {
        return equipmentService.getEquipment(name);
    }

    @Transactional
    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MEDIENTECHNIK', 'ROLE_REINIGUNGSFIRMA', 'ROLE_RECHENZENTRUM', 'ROLE_HAUSVERWALTUNG')")
    public JsonResponse saveEquipment(@RequestBody Equipment equipment) {
        return equipmentService.saveEquipment(equipment);
    }

    @Transactional
    @DeleteMapping("/{name}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MEDIENTECHNIK', 'ROLE_REINIGUNGSFIRMA', 'ROLE_RECHENZENTRUM', 'ROLE_HAUSVERWALTUNG')")
    public JsonResponse deleteEquipment(@PathVariable String name) {
        return equipmentService.deleteEquipment(name);
    }
}
