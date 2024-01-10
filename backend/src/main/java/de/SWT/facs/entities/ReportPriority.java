package de.SWT.facs.entities;

public enum ReportPriority {
    LOW("low"), MEDIUM("medium"), HIGH("high");

    private String name;

    ReportPriority(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
