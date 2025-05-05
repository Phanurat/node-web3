const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// เชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || '1111',
  database: process.env.DB_DATABASE || 'database_contracts',
  port: process.env.DB_PORT || 3306
});

// ดึงข้อมูลจากตาราง contracts
router.get('/contracts', (req, res) => {
  db.query('SELECT * FROM contracts ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// เพิ่มข้อมูลเข้าในตาราง contracts
router.post('/contracts', (req, res) => {
  const { id_contracts } = req.body;

  if (!id_contracts) {
    return res.status(400).json({ error: 'กรุณาระบุ id_contracts' });
  }

  db.query('INSERT INTO contracts (id_contracts) VALUES (?)', [id_contracts], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.status(201).json({ message: 'บันทึก Smart Contract สำเร็จ' });
  });
});

module.exports = router;


