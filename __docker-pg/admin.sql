-- Active: 1781736829829@@127.0.0.1@5432@admin
-- Conectar a la base de datos admin

-- Crear la tabla
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos
-- Usuario: admin | Contraseña: admin123 (hash generado con bcrypt)
INSERT INTO usuarios (username, password_hash) VALUES
('admin', '$2b$10$vDlYIwMYoXD3S4lhszeBNOoQUdm9DNWEC5AA/Le0VVIAy3JwzTA3e');

