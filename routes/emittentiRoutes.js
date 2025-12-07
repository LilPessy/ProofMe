// candidatiRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/:id', async (req, res) => {
    const emittente = req.params.id;

    const sql = `SELECT * FROM Emittente WHERE id = ?;`;

    try {
        const [rows] = await db.query(sql, [emittente]);
        res.json(rows);
    } catch (error) {
        console.error("Errore nel recupero candidato:", error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

module.exports = router;