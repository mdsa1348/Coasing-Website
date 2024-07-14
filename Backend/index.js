const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes'); // Import your dataRoutes
const demo = require('./routes/auth'); // Import your dataRoutes
const graph = require('./routes/graph');
const googleLogin = require('./routes/googleLogin');

const connection = require('./config');


const app = express();
const PORT = process.env.PORT || 3001;

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.use(cors());
app.use(bodyParser.json());

// Use your dataRoutes
app.use('/api', dataRoutes); // This will prefix all your dataRoutes with '/api'
app.use('/api', demo); // This will prefix all your dataRoutes with '/api'
app.use('/api', graph);
app.use('/api', googleLogin);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
