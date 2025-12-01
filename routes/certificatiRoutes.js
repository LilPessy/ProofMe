// certificatiRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Assicurati che il percorso punti al tuo file db.js

// =======================================================
// 1. GET: Visualizza certificati di un CANDIDATO (Wallet)
// =======================================================
// Ritorna: Certificato + Dati Emittente (Logo, Nome) + Dati Blocco (Hash)
router.get('/candidato/:id', async (req, res) => {
    const candidatoId = req.params.id;

    const sql = `
        SELECT 
            c.id, 
            c.denominazione, 
            c.tipo, 
            c.data_inizio, 
            c.data_fine, 
            c.valutazione, 
            c.descrizione,
            -- Dati dell'Emittente (JOIN)
            e.nome AS emittente_nome,
            e.logo AS emittente_logo,
            -- Dati della Blockchain (JOIN)
            b.hash,
            b.prev_hash,
            b.time_stamp
        FROM Certificato c
        JOIN Emittente e ON c.emittente_id = e.id
        LEFT JOIN Blocco b ON c.id = b.certificato_id
        WHERE c.candidato_id = ?
        ORDER BY c.data_inizio DESC;
    `;

    try {
        const [rows] = await db.query(sql, [candidatoId]);
        res.json(rows);
    } catch (error) {
        console.error("Errore nel recupero certificati candidato:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

// =======================================================
// 2. GET: Visualizza certificati emessi da un EMITTENTE
// =======================================================
// Ritorna: Certificato + Dati Candidato (Foto, Nome) + Dati Blocco
router.get('/emittente/:id', async (req, res) => {
    const emittenteId = req.params.id;

    const sql = `
        SELECT 
            c.id, 
            c.denominazione, 
            c.tipo, 
            c.data_inizio, 
            c.data_fine,
            -- Dati del Candidato (JOIN)
            cand.nome AS candidato_nome,
            cand.cognome AS candidato_cognome,
            cand.foto AS candidato_foto,
            -- Dati della Blockchain
            b.hash,
            b.time_stamp
        FROM Certificato c
        JOIN Candidato cand ON c.candidato_id = cand.id
        LEFT JOIN Blocco b ON c.id = b.certificato_id
        WHERE c.emittente_id = ?
        ORDER BY b.time_stamp DESC;
    `;

    try {
        const [rows] = await db.query(sql, [emittenteId]);
        res.json(rows);
    } catch (error) {
        console.error("Errore nel recupero certificati emittente:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

module.exports = router;