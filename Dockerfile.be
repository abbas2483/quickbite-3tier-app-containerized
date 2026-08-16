FROM node:22-alpine
WORKDIR /usr/src/app
COPY ./backend/package*.json .
RUN npm install
COPY ./backend/ .
EXPOSE 5001
CMD ["npm", "start"]
