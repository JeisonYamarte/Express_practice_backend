#!/bin/sh
echo "Ejecutando migraciones..."
npx sequelize-cli db:migrate
echo "Listo. Iniciando app..."
node index.js
