const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// 1. IMPORTA I FILE DELLE ROTTE
const certificatiRoutes = require('./routes/certificatiRoutes'); 
const candidatiRoutes = require('./routes/candidatiRoutes'); 
const emittentiRoutes = require('./routes/emittentiRoutes'); 
const authRoutes = require('./routes/authRoutes'); // <--- NUOVO IMPORT

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// 2. REGISTRA LE ROTTE
// Le chiamate al DB per i certificati
app.use('/api/certificati', certificatiRoutes); 

// Le chiamate per i profili utenti
app.use('/api/candidati', candidatiRoutes);
app.use('/api/emittenti', emittentiRoutes);

// Le chiamate per Login e Registrazione (IMPORTANTE)
app.use('/api/auth', authRoutes); // <--- NUOVA ROTTA REGISTRATA

// Avvio server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server attivo su http://localhost:${PORT}`);
});