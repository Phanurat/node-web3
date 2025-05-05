const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// เชื่อมต่อกับ MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || '1111',
  database: process.env.DB_DATABASE || 'database_contracts',
  port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error('การเชื่อมต่อฐานข้อมูลล้มเหลว:', err);
  } else {
    console.log('เชื่อมต่อฐานข้อมูลสำเร็จ');
  }
});

// API Routes
app.get('/api/contracts', (req, res) => {
  db.query('SELECT * FROM contracts ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/api/contracts', (req, res) => {
  const { id_contracts } = req.body;

  if (!id_contracts) {
    return res.status(400).json({ error: 'กรุณาระบุ id_contracts' });
  }

  db.query('INSERT INTO contracts (id_contracts) VALUES (?)', [id_contracts], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'บันทึก Smart Contract สำเร็จ' });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
