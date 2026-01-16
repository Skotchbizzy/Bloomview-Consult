/**
 * BLOOMVIEW BACKEND SERVER (MySQL + ClickHouse Hybrid)
 * Run this with: node server.js
 */

const express = require('express');
const mysql = require('mysql2/promise');
const { createClient } = require('@clickhouse/client');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Comprehensive CORS configuration
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// MySQL Connection Setup
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bloomview_db',
  waitForConnections: true,
  connectionLimit: 10
});

// ClickHouse Setup (Optional for analytics)
let clickhouse;
try {
  clickhouse = createClient({
    host: process.env.CLICKHOUSE_HOST || 'http://localhost:8123',
    username: process.env.CLICKHOUSE_USER || 'default',
    password: process.env.CLICKHOUSE_PASSWORD || '',
    database: process.env.CLICKHOUSE_DB || 'bloomview_analytics',
  });
} catch (e) {
  console.warn('⚠️ ClickHouse Analytics offline.');
}

const ADMIN_PASSCODE = 'bloom2025';

const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && (authHeader.split(' ')[1] === ADMIN_PASSCODE || authHeader === ADMIN_PASSCODE)) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

/**
 * ROUTES
 */

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', database: 'connected' });
});

app.post('/api/leads', async (req, res) => {
  const { name, email, service, message } = req.body;
  const timestamp = Date.now();
  try {
    const [result] = await pool.execute(
      'INSERT INTO leads (name, email, service, message, status, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, service, message, 'new', timestamp]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/leads', authorize, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM leads ORDER BY timestamp DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/leads/:id', authorize, async (req, res) => {
  try {
    await pool.execute('UPDATE leads SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
    res.json({ message: 'Updated' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/leads/:id', authorize, async (req, res) => {
  try {
    await pool.execute('DELETE FROM leads WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/subscribe', async (req, res) => {
  try {
    await pool.execute('INSERT IGNORE INTO subscribers (email) VALUES (?)', [req.body.email]);
    res.status(200).json({ message: 'Subscribed' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

const PORT = 5000;
// We listen on 0.0.0.0 to be accessible on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n-----------------------------------------`);
  console.log(`🚀 BLOOMVIEW SERVER IS RUNNING`);
  console.log(`📡 API Access: http://127.0.0.1:${PORT}/api`);
  console.log(`-----------------------------------------\n`);
  
  pool.getConnection().then(c => {
    console.log('✅ Connected to MySQL: bloomview_db');
    c.release();
  }).catch(e => {
    console.error('❌ MySQL Connection Failed:', e.message);
    console.log('TIP: Ensure your XAMPP/WAMP MySQL is started.');
  });
});