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
('admin', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36rQoeG6Lruj3mCq9q');


SELECT password_hash, length(password_hash) FROM usuarios WHERE username = 'admin';

UPDATE usuarios 
SET password_hash = '$2b$10$WPpjULRmmaWHFuL0qkGsWO.3Sr33V3DVwmOuHKo0DjUpSajcDK4Bi' 
WHERE username = 'admin';

SELECT password_hash, length(password_hash) FROM usuarios WHERE username = 'admin';