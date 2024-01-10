package de.SWT.facs.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.SWT.facs.entities.Equipment;
import de.SWT.facs.entities.reqres.JsonResponse;
import de.SWT.facs.repository.EquipmentRepository;

@Service
public class EquipmentService {

    @Autowired
    EquipmentRepository equipmentRepository;

    public EquipmentService() { }

    public List<Equipment> getEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment getEquipment(String name) {
        Optional<Equipment> equipment = equipmentRepository.findById(name);
        if (!equipment.isPresent()) {
            return null;
        }

        return equipment.get();
    }

    public JsonResponse saveEquipment(Equipment equipment) {
        try {
            equipmentRepository.save(equipment);
            return new JsonResponse(200, "Equipment succesfully saved");
        } catch (IllegalArgumentException e) {
            return new JsonResponse(500, e.getMessage());
        }
    }

    public JsonResponse deleteEquipment(String name) {
        try {
            equipmentRepository.deleteById(name);
            return new JsonResponse(200, "Equipment succesfully deleted");
        } catch (IllegalArgumentException e) {
            return new JsonResponse(500, e.getMessage());
        }
    }
}
