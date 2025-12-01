const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Per leggere i JSON in arrivo

// Rotta di test
app.get('/', (req, res) => {
  res.send('ProofMe Backend is running! 🚀');
});

// Qui importeremo le rotte (es. /api/auth, /api/certificati)
// ...

app.listen(port, () => {
  console.log(`Server attivo su http://localhost:${port}`);
});