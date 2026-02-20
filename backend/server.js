const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Autorise le frontend à appeler l'API (CORS)
app.use(cors());
app.use(express.json());

// Configuration de la connexion à PostgreSQL via les variables d'environnement
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user_asso',
  password: process.env.DB_PASSWORD || 'password_asso',
  database: process.env.DB_NAME || 'asso_db',
  port: 5432,
});

// --- INITIALISATION DE LA DB (DevOps Helper) ---
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        date VARCHAR(50),
        category VARCHAR(50),
        description TEXT
      );
    `);
    
    // Ajout d'un événement de test si la table est vide
    const res = await pool.query('SELECT COUNT(*) FROM events');
    if (parseInt(res.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO events (title, date, category, description) 
        VALUES ('Grand Gala Annuel', '15 Juin 2026', 'Culture', 'Une soirée inoubliable pour soutenir nos projets.');
      `);
      console.log("✅ Données de test insérées.");
    }
  } catch (err) {
    console.error("❌ Erreur init DB:", err.message);
  }
};

initDb();

// --- ROUTES API ---

// Route pour récupérer tous les événements
app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route de santé (Healtcheck - très utile en DevOps)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`🚀 Backend asso écoutant sur http://localhost:${port}`);
});