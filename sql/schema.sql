CREATE DATABASE IF NOT EXISTS proofme;
USE proofme;

-- 1. Tabella Candidato (Aggiornata con foto, tel, nazionalità)
CREATE TABLE Candidato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    data_nascita DATE NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hashed VARCHAR(255) NOT NULL,
    tel VARCHAR(20) NOT NULL,        
    foto VARCHAR(512) NOT NULL,        
    nazionalita VARCHAR(100) NOT NULL,   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabella Emittente (Aggiornata con tel)
CREATE TABLE Emittente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo ENUM('AZIENDA', 'UNIVERSITA', 'ENTE_FORMAZIONE', 'ALTRO') NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hashed VARCHAR(255) NOT NULL,
    indirizzo VARCHAR(255),
    logo VARCHAR(512),
    cf VARCHAR(50) UNIQUE,
    tel VARCHAR(20) NOT NULL,           
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Certificato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    denominazione VARCHAR(255) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    data_inizio DATE NOT NULL,
    data_fine DATE,            
    valutazione VARCHAR(100),   
    descrizione TEXT,
    candidato_id INT NOT NULL,
    emittente_id INT NOT NULL,
    
    FOREIGN KEY (candidato_id) REFERENCES Candidato(id) ON DELETE CASCADE,
    FOREIGN KEY (emittente_id) REFERENCES Emittente(id) ON DELETE CASCADE
);

CREATE TABLE Blocco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hash CHAR(64) NOT NULL UNIQUE,     
    prev_hash CHAR(64),                 
    time_stamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    certificato_id INT NOT NULL UNIQUE,
    
    FOREIGN KEY (certificato_id) REFERENCES Certificato(id) ON DELETE CASCADE
);