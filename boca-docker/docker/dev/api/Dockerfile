FROM node:18

# Create app directory
WORKDIR /usr/src/app/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./docker/dev/api/package*.json ./

#COPY ./docker/dev/api/server.js ./

RUN npm install

#run npm start

# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY ./docker/dev/api/ .

EXPOSE 8080
CMD [ "npm", "start" ]