# WE5facs

A software to report problems occuring in rooms of the WE5 University.

## Local deployment
- `docker-compose build`
- `docker-compose up`
- The system is now accessible at `localhost:80`

## Deploying the components of the software independently
- `docker-compose up mariadb` to launch the database
- `docker-compose build backend` to build the backend
- `docker-compose up backend` to launch the backend
- `docker-compose build frontend` to build the frontend
- `docker-compose up frontend` to launch the frontend

## Development Frontend
- cd to `frontendWe5`
- execute command `ng serve --open --port 80`
- the frontend can now be accessed on port 80
- autoreload is activated

## Development Backend
- `docker-compose up mariadb` to launch the database
- import backend as maven project to run spring boot
- cd to `backend`
- run `FacsApplication.java`

## Notes
- The first person who logs into the system is granted the `ADMIN` role, afterwards, the role `REPORTER` is granted by default.