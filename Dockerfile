FROM node:latest

COPY . /back
WORKDIR /back

RUN ls -la
RUN npm install
ENTRYPOINT ["npm", "start"]
