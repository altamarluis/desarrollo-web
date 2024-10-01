CREATE TABLE Users (
    user_id VARCHAR(50) PRIMARY KEY,
    role VARCHAR(20) CHECK (role IN ('admin', 'transporter', 'client')) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(255)
);

INSERT INTO Users (user_id, role, username, email, nationality, password, location)
VALUES 
('1', 'admin', 'Aang', 'aang@air.com', 'Nómadas Aire', 'AirBender123!', 'Templo Aire del Sur'),
('2', 'transporter', 'Katara', 'katara@water.com', 'Tribu Agua del Sur', 'WaterBending4Life!', 'Tribu Agua del Sur'),
('3', 'client', 'Zuko', 'zuko@fire.com', 'Nación del Fuego', 'Honor4Ever!', 'Capital de la Nación del Fuego');

CREATE TABLE BusinessRules (
    rule_id INT PRIMARY KEY,
    max_km_per_bison INT NOT NULL,
    bison_rest_days INT NOT NULL,
    distance_rate DECIMAL(10, 2) NOT NULL,
    weight_rate DECIMAL(10, 2) NOT NULL,
    declared_value_rate DECIMAL(10, 2) NOT NULL,
    medium_dimension_charge DECIMAL(10, 2) NOT NULL,
    large_dimension_charge DECIMAL(10, 2) NOT NULL
);

INSERT INTO BusinessRules (
    rule_id,
    max_km_per_bison,
    bison_rest_days,
    distance_rate,
    weight_rate,
    declared_value_rate,
    medium_dimension_charge,
    large_dimension_charge
)
VALUES (
    1,                -- Forzamos que el id siempre sea 1
    600,              -- Tope máximo de km recorridos por bisonte
    2,                -- Días de descanso bisontes
    0.50,             -- Tarifa por distancia
    1.75,             -- Tarifa por peso
    2.00,             -- Tarifa por valor declarado
    35.00,            -- Cargo por dimensión media
    60.00             -- Cargo por dimensión grande
);

CREATE TABLE Cities (
    city_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO Cities (name)
VALUES 
('Ba Sing Se'),
('Ciudad República'),
('Tribu Agua del Sur'),
('Omashu'),
('Isla Kyoshi');

CREATE TABLE Distances (
    distance_id INT AUTO_INCREMENT PRIMARY KEY,
    origin_city_id INT,
    destination_city_id INT,
    distance INT NOT NULL,
    UNIQUE (origin_city_id, destination_city_id),
    FOREIGN KEY (origin_city_id) REFERENCES Cities(city_id),
    FOREIGN KEY (destination_city_id) REFERENCES Cities(city_id)
);

INSERT INTO Distances (origin_city_id, destination_city_id, distance)
VALUES 
(1, 2, 74),
(1, 3, 38),
(1, 4, 50),
(2, 3, 68),
(2, 5, 89),
(3, 4, 45),
(4, 5, 56);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50),
    transporter_id VARCHAR(50),
    origin_city_id INT,
    destination_city_id INT,
    origin_address VARCHAR(255) NOT NULL,
    destination_address VARCHAR(255) NOT NULL,
    service_date DATE NOT NULL,
    declared_value DECIMAL(10, 2) NOT NULL,
    order_type VARCHAR(20) CHECK (order_type IN ('mudanza', 'documento', 'objeto')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Inactivo', 'En tránsito', 'Retrasado', 'Extraviado', 'Entregado')) NOT NULL,
    tracking_code VARCHAR(50) UNIQUE NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (transporter_id) REFERENCES Users(user_id),
    FOREIGN KEY (origin_city_id) REFERENCES Cities(city_id),
    FOREIGN KEY (destination_city_id) REFERENCES Cities(city_id)
);

CREATE INDEX idx_orders_tracking_code ON Orders(tracking_code);

CREATE TRIGGER trigger_update_date
BEFORE UPDATE ON Orders
FOR EACH ROW
BEGIN
    SET NEW.last_updated_date = CURRENT_TIMESTAMP;
END;

INSERT INTO Orders (
    user_id, transporter_id, origin_city_id, destination_city_id,
    origin_address, destination_address, service_date, declared_value,
    order_type, status, tracking_code
) VALUES (
    '3', '2', 1, 5, 
    'Calle del Jasmine Dragon 123', 'Avenida del Avatar 456', 
    '2024-10-15', 500.00, 'mudanza', 'En tránsito', 'm1532'
);

INSERT INTO Orders (
    user_id, transporter_id, origin_city_id, destination_city_id,
    origin_address, destination_address, service_date, declared_value,
    order_type, status, tracking_code
) VALUES (
    '3', '2', 1, 3, 
    'Calle del Jasmine Dragon 123', 'Iglú Central 101', 
    '2024-10-10', 300.00, 'objeto', 'Entregado', 'o1332'
);

INSERT INTO Orders (
    user_id, transporter_id, origin_city_id, destination_city_id,
    origin_address, destination_address, service_date, declared_value,
    order_type, status, tracking_code
) VALUES (
    '3', '2', 2, 4, 
    'Muro Exterior 303', 'Calle de los Pingüinos 202', 
    '2024-10-18', 100.00, 'documento', 'Retrasado', 'd2432'
);

CREATE TABLE Bisons (
    bison_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    transporter_id VARCHAR(50),
    status VARCHAR(20) CHECK (status IN ('Disponible', 'En tránsito', 'Descansando')) NOT NULL,
    km_traveled INT NOT NULL DEFAULT 0,
    rest_end_date DATE,
    FOREIGN KEY (transporter_id) REFERENCES Users(user_id)
);
