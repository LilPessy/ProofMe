const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt'); // npm install bcrypt

// POST /api/auth/register/candidato
router.post('/register/candidato', async (req, res) => {
    const { nome, cognome, data_nascita, email, password, tel, nazionalita, foto } = req.body;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO Candidato (nome, cognome, data_nascita, email, password_hashed, tel, nazionalita, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        await db.query(sql, [nome, cognome, data_nascita, email, hashedPassword, tel, nazionalita, foto || '']);
        
        res.status(201).json({ message: "Candidato registrato con successo" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore durante la registrazione (Email già usata?)" });
    }
});

// POST /api/auth/register/emittente
router.post('/register/emittente', async (req, res) => {
    // Logica simile per Emittente...
    const { nome, tipo, email, password, indirizzo, cf, tel, logo } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO Emittente (nome, tipo, email, password_hashed, indirizzo, cf, tel, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.query(sql, [nome, tipo, email, hashedPassword, indirizzo, cf, tel, logo || '']);
        res.status(201).json({ message: "Emittente registrato" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore registrazione emittente" });
    }
});

module.exports = router;