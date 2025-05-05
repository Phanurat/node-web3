const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const contractsRoutes = require('./routes/contracts');

const app = express();

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

// เชื่อมต่อกับ MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'db',  // ใช้ db เพื่อเชื่อมต่อกับ MySQL container
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

app.use('/api', contractsRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
