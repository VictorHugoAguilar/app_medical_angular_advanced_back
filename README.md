# Back-End de Aplicación de gestion medica

Un back-end con CRUD para gestion de medico, hospitales. Login contra la misma aplicación, o contra google sign.
Gestion de imagenes, para subir o descargarlas.
Gestion de middleware para validar datos (con validadores de datos, o jwt).

Para correr la aplicacion son necesarios los siguientes pasos:

- Levantar un servidor mongo, y crear la propia configuración ya que no esta el la configuración subida.

````
  sudo mongod --dbpath /Users/*******/data/mongo-data/
````

- Levantar el servidor de node con express en desarrollo

````
  npm run start:dev
````


