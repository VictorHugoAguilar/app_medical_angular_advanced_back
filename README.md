# Back-End de Aplicación de gestion medica

Un back-end con CRUD para gestion de medico, hospitales. Login contra la misma aplicación, o contra google sign.
Gestion de imagenes, para subir o descargarlas.
Gestion de middleware para validar datos (con validadores de datos, o jwt).

Para correr la aplicacion son necesarios los siguientes pasos:

- Levantar un servidor mongo, y crear la propia configuración ya que no esta el la configuración subida.

````
  sudo mongod --dbpath /Users/*******/data/mongo-data/
````

- Configurar las variables de entorno

ejemplo: 

`````
DB_CNN='mongodb://localhost:27017/medical'
PORT='3000'
JWT_SECRET='secret'
````


- Levantar el servidor de node con express en desarrollo

````
  npm run start:dev
````


- En entorno desarrollo podemos levantar una bd mongo en un docker

Hacer un pull de un docker de mongo

`````
docker run -d -p 27017:27017 --name=medical mongo:4.2
``````

En la página podemos ver que el nombre de la imagen es mongo (gracias capitán obvio), entonces vamos a instalar usando el comando run de docker. En una terminal ejecuta lo lo siguiente:

`````
docker run -d -p 27017:27017 --name medical mongo:4.2
`````





