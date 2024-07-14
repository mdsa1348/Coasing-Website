const express = require('express');
const router = express.Router();
const connection = require('../config');

// Define route handler to retrieve all data
// const getAllData = (req, res) => {
//   connection.query('SELECT * FROM contact_form', (err, results) => {
//     if (err) {
//       console.error('Error executing MySQL query:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.json(results);
//   });
// };

// Define route handler to retrieve data by userId
const getDataByUserId = (req, res) => {
  const { userId } = req.params;
  connection.query('SELECT * FROM contact_form WHERE userId = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};

// Define route handler to insert data
const insertData = (req, res) => {
  const { userId } = req.params;
  const { name, email, message } = req.body;

  connection.query(
    'INSERT INTO contact_form (Name, Email, Message, userId) VALUES (?, ?, ?, ?)',
    [name, email, message, userId],
    (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      console.log('Data inserted successfully:', results);
      res.json({ message: 'Data inserted successfully' });
    }
  );
};

// Define route handler to update data
const updateData = (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  connection.query(
    'UPDATE contact_form SET Name = ?, Email = ?, Message = ? WHERE Id = ?',
    [newData.Name, newData.Email, newData.Message, id],
    (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      console.log('Data updated successfully:', results);
      res.json({ message: 'Data updated successfully' });
    }
  );
};

// Define route handler to delete data
const deleteData = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM contact_form WHERE Id = ?', id, (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Data deleted successfully' });
  });
};


// Define route handler to retrieve all data
const getAllData = (req, res) => {
  connection.query('SELECT * FROM contact_form', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};


// Define routes
router.get('/datas', getAllData);

// Define routes
//router.get('/datas', getAllData);
router.get('/datas/:userId', getDataByUserId);
router.post('/datas/:userId', insertData);
router.put('/datas/:id', updateData);
router.delete('/datas/:id', deleteData);

module.exports = router;
