const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Email endpoint
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Interview Panel" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent', info });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/reject-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: `"Interview Panel" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Rejection email sent', info });
  } catch (err) {
    console.error('Error sending rejection email:', err);
    res.status(500).json({ error: 'Failed to send rejection email' });
  }
});




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));