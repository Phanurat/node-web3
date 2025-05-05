const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const contractsRoutes = require('./routes/contracts');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createPool({
  host: 'db', // ใช้ชื่อ service db จาก docker-compose.yml
  user: 'admin',
  password: '1111',
  database: 'database_contracts',
  port: 3306,
  connectionLimit: 10 // กำหนดจำนวนการเชื่อมต่อสูงสุด
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
  connection.release(); // ปล่อย connection หลังใช้งาน
});

app.use('/api', contractsRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
