# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará (el puerto que usa tu servidor Express)
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
