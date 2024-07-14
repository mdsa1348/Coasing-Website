const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../config');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// Route handler for user sign-up
router.post('/signup', async (req, res) => {
  const { name, email, address, password } = req.body;
  const createdAt = new Date();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, address, password_hash, createdat) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, address, hashedPassword, createdAt], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Error signing up' });
        return;
      }
      console.log('User signed up successfully');
      res.status(200).json({ message: 'Signup successful' });
    });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Error signing up' });
  }
});

// Route handler for user sign-in
router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  console.log('Sign in attempt:', { email });

  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const user = results[0];
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      console.log('Password valid, signing in:', { email });
      res.status(200).json({ message: 'Signin successful', token: 'dummy-token' }); // Generate a real token here
    } catch (error) {
      console.error('Error comparing passwords:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});


// Route handler to send OTP for password reset
router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;

  try {
    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number

    console.log('Generated OTP:', otp); // Log the OTP

    // Update user record in database with OTP (you might want a separate OTP table in production)
    const updateSql = 'UPDATE users SET otp= ? WHERE email= ?';
    connection.query(updateSql, [otp.toString(), email], async (err, result) => {
      if (err) {
        console.error('Error updating OTP in database:', err);
        return res.status(500).json({ error: 'Error updating OTP' });
      }

      // Send OTP to user's email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: 'saahammed134867@gmail.com', // Replace with environment variable
          pass: 'sbjl vsri fqqx chtb', // Replace with environment variable
        },
      });

      const mailOptions = {
        from: 'saahammed134867@gmail.com', // Replace with environment variable
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Error sending OTP email' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'OTP sent successfully' });
      });
    });
  } catch (error) {
    console.error('Error handling forgot password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route handler to reset password using OTP
router.post('/resetpassword', async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    // Check if OTP matches with the one stored in the database
    const sql = 'SELECT * FROM users WHERE email = ? AND otp = ?';
    connection.query(sql, [email, otp], async (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid OTP' });
      }

      // Update user's password in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateSql = 'UPDATE users SET password_hash = ?, otp = NULL WHERE email = ?';
      connection.query(updateSql, [hashedPassword, email], (err, result) => {
        if (err) {
          console.error('Error updating password in database:', err);
          return res.status(500).json({ error: 'Error updating password' });
        }
        console.log('Password reset successful');
        res.status(200).json({ message: 'Password reset successful' });
      });
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
