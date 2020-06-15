FROM node:laterst
MAINTAINER Levi Modesto
COPY . /var/www
RUN npm install
ENTRYPOINT [ "npm", "start" ]
EXPOSE 3000
