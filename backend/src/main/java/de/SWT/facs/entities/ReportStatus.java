package de.SWT.facs.entities;

public enum ReportStatus {
    OPEN("open"), IN_PROGRESS("in_progress"), CLOSED("closed");

    private String name;

    ReportStatus(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
