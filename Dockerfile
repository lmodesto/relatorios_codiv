FROM node:10.15.1
MAINTAINER Levi Modesto
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT [ "npm", "start" ]
EXPOSE 3000
