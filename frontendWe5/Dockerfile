
### build frontend ###
FROM node:12.2.0 as buildfrontend
ENV SRCPATH=.
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ${SRCPATH}/package.json /app/package.json
COPY ${SRCPATH}/package-lock.json /app/package-lock.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9
COPY ${SRCPATH}/ /app
# RUN ng build --configuration=production --verbose=true
RUN ng build --verbose=true

### deploy frontend ###
FROM nginx:1.15 as frontend
COPY --from=buildfrontend /app/dist/frontendWe5/ /usr/share/nginx/html
ENV SRCPATH=.
COPY ${SRCPATH}/nginx.conf /etc/nginx/conf.d/default.conf


### build frontend ###
FROM node:12.2.0 as buildfrontend_prod
ENV SRCPATH=.
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ${SRCPATH}/package.json /app/package.json
COPY ${SRCPATH}/package-lock.json /app/package-lock.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9
COPY ${SRCPATH}/ /app
RUN ng build --configuration=production --verbose=true

### deploy frontend ###
FROM nginx:1.15 as frontend_dev
COPY --from=buildfrontend_prod /app/dist/frontendWe5/ /usr/share/nginx/html
ENV SRCPATH=.
COPY ${SRCPATH}/nginx.conf /etc/nginx/conf.d/default.conf