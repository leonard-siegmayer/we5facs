package de.SWT.facs.entities;

/**
 * Defines the role of a user.
 */
public enum Role {

    ROLE_RECHENZENTRUM("rechenzentrum"), ROLE_HAUSVERWALTUNG("hausverwaltung"),
    ROLE_MEDIENTECHNIK("medientechnik"), ROLE_REINIGUNGSFIRMA("reinigungsfirma"),
    ROLE_REPORTER("reporter"), ROLE_ADMIN("admin");

    private String simpleName;

    Role(String simpleName) {
        this.simpleName = simpleName;
    }

    public String getSimpleName() {
        return this.simpleName;
    }

}
