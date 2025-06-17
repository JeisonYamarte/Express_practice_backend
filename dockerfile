# Utiliza la imagen oficial de Node.js 22 en variante Alpine (ligera)
FROM node:22.3.0-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de dependencias y los instala
COPY package*.json ./
RUN npm install --production

# Copia el resto del código de la aplicación
COPY . .

# Expón el puerto en el que la aplicación escuchará
EXPOSE 3000

# Define variables de entorno por defecto (puedes sobrescribirlas en Railway)
ENV NODE_ENV=production

# Al inicio del contenedor, corre migraciones y luego arranca la aplicación
CMD ["sh", "-c", "npx sequelize db:migrate && npm start"]
