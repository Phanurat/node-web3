const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

function connectWithRetry(retries = 10, delay = 3000) {
  return new Promise((resolve, reject) => {
    const tryConnect = () => {
      const db = mysql.createConnection({
        host: 'db',
        user: 'admin',
        password: '1111',
        database: 'database_contracts',
        port: 3306
      });

      db.connect((err) => {
        if (err) {
          console.error(`การเชื่อมต่อฐานข้อมูลล้มเหลว (${retries}):`, err.code);
          if (retries <= 0) return reject(err);
          setTimeout(() => connectWithRetry(retries - 1, delay).then(resolve).catch(reject), delay);
        } else {
          console.log('เชื่อมต่อฐานข้อมูลสำเร็จ');
          resolve(db);
        }
      });
    };

    tryConnect();
  });
}

let db;
connectWithRetry().then((connection) => {
  db = connection;
}).catch(() => {
  process.exit(1); // ปิดถ้าเชื่อมไม่ได้จริงๆ
});

router.get('/contracts', (req, res) => {
  db.query('SELECT * FROM contracts ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err); // เพิ่มบรรทัดนี้
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

router.post('/contracts', (req, res) => {
  const { id_contracts } = req.body;

  if (!id_contracts) {
    return res.status(400).json({ error: 'กรุณาระบุ id_contracts' });
  }

  db.query('INSERT INTO contracts (id_contracts) VALUES (?)', [id_contracts], (err, results) => {
    if (err) {
      console.error('Error inserting into the database:', err); // เพิ่มบรรทัดนี้
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'บันทึก Smart Contract สำเร็จ' });
  });
});


module.exports = router;
