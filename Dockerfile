FROM node:alpine
WORKDIR /Yes-No-App
COPY . .
RUN npm ci
EXPOSE 3000
CMD ["npm", "start"]