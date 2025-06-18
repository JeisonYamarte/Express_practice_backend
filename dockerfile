FROM node:22.3.0-alpine

WORKDIR /app

COPY package*.json ./

# 👇 Omitimos solo peer/optional, no devs (porque sequelize-cli es necesario)
RUN npm install

COPY . .

EXPOSE 3000


CMD ["node", "index.js"]
