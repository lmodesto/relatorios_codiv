FROM node:10.15.1
MAINTAINER Levi Modesto
COPY . /var/opt
WORKDIR /var/opt
RUN npm install
ENTRYPOINT [ "npm", "start" ]
EXPOSE 3000
