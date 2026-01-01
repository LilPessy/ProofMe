// certificatiRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 
const crypto = require('crypto'); // <--- 1. Importiamo la libreria per l'hash SHA-256

// =======================================================
// 1. GET: Visualizza certificati di un CANDIDATO (Wallet)
// =======================================================
router.get('/candidato/:id', async (req, res) => {
    const candidatoId = req.params.id;

    const sql = `
        SELECT 
            c.id, c.denominazione, c.tipo, c.data_inizio, c.data_fine, c.valutazione, c.descrizione,
            e.nome AS emittente_nome, e.logo AS emittente_logo,
            b.hash, b.prev_hash, b.time_stamp
        FROM Certificato c
        JOIN Emittente e ON c.emittente_id = e.id
        LEFT JOIN Blocco b ON c.id = b.certificato_id
        WHERE c.candidato_id = ?
        ORDER BY c.data_inizio;
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
router.get('/emittente/:id', async (req, res) => {
    const emittenteId = req.params.id;

    const sql = `
        SELECT 
            c.id, c.denominazione, c.tipo, c.data_inizio, c.data_fine,
            cand.nome AS candidato_nome, cand.cognome AS candidato_cognome, cand.foto AS candidato_foto,
            b.hash, b.time_stamp
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

// =======================================================
// 3. POST: EMISSIONE NUOVO CERTIFICATO (Mining simulato)
// =======================================================
router.post('/', async (req, res) => {
    // Recuperiamo una connessione dedicata per la transazione
    const conn = await db.getConnection();

    try {
        // 1. Recupero dati dal Frontend
        const { 
            idCandidato, emittenteId, nomeCertificato, tipoCertificato, 
            descrizione, dataInizio, dataFine, votoLaurea 
        } = req.body;

        if (!emittenteId) {
            return res.status(401).json({ error: "Emittente non identificato. Effettua il login." });
        }

        // --- INIZIO TRANSAZIONE ---
        await conn.beginTransaction();

        // A. Inserimento nella tabella CERTIFICATO
        const [certResult] = await conn.query(
            `INSERT INTO Certificato 
            (denominazione, tipo, data_inizio, data_fine, valutazione, descrizione, candidato_id, emittente_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nomeCertificato, tipoCertificato, dataInizio, dataFine || null, votoLaurea || null, descrizione, idCandidato, emittenteId]
        );
        
        const nuovoCertificatoId = certResult.insertId;

        // B. Logica BLOCKCHAIN (Calcolo Hash)
        
        // B1. Recupera l'hash dell'ultimo blocco inserito (PrevHash)
        const [lastBlock] = await conn.query('SELECT hash FROM Blocco ORDER BY id DESC LIMIT 1');
        // Se è il primo blocco (Genesis), usiamo una stringa di zeri
        const prevHash = lastBlock.length > 0 ? lastBlock[0].hash : '0'.repeat(64);
        
        const timestamp = new Date().toISOString();

        // B2. Crea il payload univoco da hashare
        const datiBlocco = {
            id: nuovoCertificatoId,
            emittente: emittenteId,
            candidato: idCandidato,
            prevHash: prevHash,
            timestamp: timestamp
        };

        // B3. Calcola l'hash SHA-256
        const hash = crypto.createHash('sha256').update(JSON.stringify(datiBlocco)).digest('hex');

        // C. Inserimento nella tabella BLOCCO
        // Nota: new Date(timestamp) converte la stringa ISO in formato data compatibile con MySQL
        await conn.query(
            `INSERT INTO Blocco (hash, prev_hash, time_stamp, certificato_id) 
             VALUES (?, ?, ?, ?)`,
            [hash, prevHash, new Date(timestamp), nuovoCertificatoId]
        );

        // --- COMMIT TRANSAZIONE ---
        await conn.commit();

        res.status(201).json({ 
            message: 'Certificato emesso con successo!', 
            certificatoId: nuovoCertificatoId,
            hashBlocco: hash
        });

    } catch (error) {
        // Se c'è un errore, annulla tutte le operazioni fatte nel DB (Rollback)
        await conn.rollback();
        console.error("Errore durante l'emissione:", error);
        res.status(500).json({ error: "Errore durante l'emissione del certificato." });
    } finally {
        // Rilascia la connessione al pool
        conn.release();
    }
});

module.exports = router;