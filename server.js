const express = require('express');
const path = require('path');
const contractsRoutes = require('./routes/contracts');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', contractsRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
