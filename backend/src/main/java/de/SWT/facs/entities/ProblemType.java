package de.SWT.facs.entities;

/**
 * Defines the type of a reported problem
 */
public enum ProblemType {
    REPAIR("repair"), CLEAN("clean"), REFILL("refill"), OTHER("other");

    private String name;

    ProblemType(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
