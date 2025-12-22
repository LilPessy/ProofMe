const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt'); // npm install bcrypt
const upload = require('../middlewares/upload');

router.post(
  '/register/candidato',
  upload.single('foto'),
  async (req, res) => {

    const {
      nome,
      cognome,
      data_nascita,
      email,
      password,
      tel,
      nazionalita
    } = req.body;

    const fotoPath = req.file
      ? `/uploads/${req.file.filename}`
      : '';

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO Candidato
        (nome, cognome, data_nascita, email, password_hashed, tel, nazionalita, foto)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await db.query(sql, [
        nome,
        cognome,
        data_nascita,
        email,
        hashedPassword,
        tel,
        nazionalita,
        fotoPath
      ]);

      res.status(201).json({ message: "Candidato registrato con successo" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore registrazione candidato" });
    }
});


router.post(
  '/register/emittente',
  upload.single('logo'),
  async (req, res) => {

    const {
      nome,
      tipo,
      email,
      password,
      indirizzo,
      cf,
      tel
    } = req.body;

    const logoPath = req.file
      ? `/uploads/${req.file.filename}`
      : '';

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO Emittente
        (nome, tipo, email, password_hashed, indirizzo, cf, tel, logo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await db.query(sql, [
        nome,
        tipo,
        email,
        hashedPassword,
        indirizzo,
        cf,
        tel,
        logoPath
      ]);

      res.status(201).json({ message: "Emittente registrata" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore registrazione emittente" });
    }
});


module.exports = router;