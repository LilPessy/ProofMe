USE proofme;

-- Pulizia opzionale delle tabelle (per evitare duplicati se lanci lo script più volte)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE Blocco;
-- TRUNCATE TABLE Certificato;
-- TRUNCATE TABLE Candidato;
-- TRUNCATE TABLE Emittente;
-- SET FOREIGN_KEY_CHECKS = 1;


-- =============================================
-- 1. INSERIMENTO EMITTENTI
-- =============================================
-- Nota: Aggiunto il campo 'tel' obbligatorio
INSERT INTO Emittente (nome, tipo, email, password_hashed, indirizzo, logo, cf, tel, is_verified) VALUES 
(
    'Politecnico di Bari', 
    'UNIVERSITA', 
    'segreteria@poliba.it', 
    '$2b$10$X7...hashfinto', 
    'Via Edoardo Orabona 4, Bari', 
    'https://upload.wikimedia.org/wikipedia/it/1/1f/Politecnico_di_Bari.svg', 
    '04300000724', 
    '+39 080 5962111',  -- Nuovo campo obbligatorio
    TRUE
),
(
    'Auriga S.p.A.', 
    'AZIENDA', 
    'hr@auriga.com', 
    '$2b$10$Y8...hashfinto', 
    'Via Calefati 12, Bari', 
    'https://www.aurigaspa.com/logo.png', 
    '12345678901', 
    '+39 080 5009988',  -- Nuovo campo obbligatorio
    TRUE
);


-- =============================================
-- 2. INSERIMENTO CANDIDATO
-- =============================================
-- Nota: Aggiunti 'tel', 'foto', 'nazionalita' obbligatori
INSERT INTO Candidato (nome, cognome, data_nascita, email, password_hashed, tel, foto, nazionalita) VALUES 
(
    'Daniele', 
    'Rossi', 
    '2001-05-20', 
    'daniele.rossi@email.com', 
    '$2b$10$Z9...hashfinto', 
    '+39 333 1234567',                  -- Nuovo campo obbligatorio
    'https://i.pravatar.cc/300?img=11', -- URL foto mock (o percorso locale)
    'Italiana'                          -- Nuovo campo obbligatorio
);


-- =============================================
-- 3. INSERIMENTO CERTIFICATI (OFF-CHAIN)
-- =============================================
-- Assumiamo ID auto-increment: Candidato=1, Poliba=1, Auriga=2

-- Certificato 1: Laurea (Emesso da Poliba)
INSERT INTO Certificato (denominazione, tipo, data_inizio, data_fine, valutazione, descrizione, candidato_id, emittente_id) VALUES 
(
    'Laurea Triennale in Ing. Informatica', 
    'Istruzione', 
    '2020-09-20', 
    '2023-11-12', 
    '110L/110', 
    'Tesi in Blockchain Permissioned applicata ai processi HR', 
    1, -- Daniele
    1  -- Poliba
);

-- Certificato 2: Lavoro (Emesso da Auriga)
INSERT INTO Certificato (denominazione, tipo, data_inizio, data_fine, valutazione, descrizione, candidato_id, emittente_id) VALUES 
(
    'Junior Web Developer', 
    'Lavoro', 
    '2023-12-01', 
    NULL, -- Lavoro in corso
    NULL, 
    'Sviluppo frontend con React e backend con Node.js. Gestione database MySQL.', 
    1, -- Daniele
    2  -- Auriga
);


-- =============================================
-- 4. INSERIMENTO BLOCCHI (ON-CHAIN)
-- =============================================

-- BLOCCO 1 (Genesis per il certificato Poliba)
-- Hash generato (finto) per il certificato ID 1
INSERT INTO Blocco (hash, prev_hash, time_stamp, certificato_id) VALUES 
(
    'a1b2c3d4e5f67890123456789abcdef1234567890abcdef1234567890abcde', -- Hash corrente
    NULL, -- Genesis block
    '2023-11-12 10:00:00', 
    1
);

-- BLOCCO 2 (Per il certificato Auriga)
-- Importante: prev_hash deve coincidere con l'hash del blocco 1
INSERT INTO Blocco (hash, prev_hash, time_stamp, certificato_id) VALUES 
(
    'f9e8d7c6b5a432109876543210fedcba0987654321fedcba098765432154321', -- Nuovo Hash
    'a1b2c3d4e5f67890123456789abcdef1234567890abcdef1234567890abcde', -- Link al precedente
    '2023-12-01 09:30:00', 
    2
);