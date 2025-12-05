// app.js (o index.js)
const express = require('express');
const cors = require('cors');
// ... altri import

// 1. IMPORTA IL FILE DELLE ROTTE
const certificatiRoutes = require('./routes/certificatiRoutes'); // Aggiusta il percorso se necessario

const candidatiRoutes = require('./routes/candidatiRoutes'); // Aggiusta il percorso se necessario

const app = express();

app.use(cors());
app.use(express.json());

// ... altre configurazioni

// 2. USA LE ROTTE
// Tutte le chiamate inizieranno con /api/certificati
app.use('/api/certificati', certificatiRoutes); 
app.use('/api/candidati', candidatiRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server attivo su http://localhost:${PORT}`);
});