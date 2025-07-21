-- Crear base de datos
CREATE DATABASE contacto;

-- Crear tabla para los mensajes
CREATE TABLE mensajes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(150),
  mensaje TEXT
);