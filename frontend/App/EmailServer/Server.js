const express = require('express');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // This enables CORS for all routes

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sehajv@gmail.com',
    pass: 'ayugpdiuqfounyob',
  },
});

// Endpoint to say "hi how are you"
app.get('/', (req, res) => {
  console.log( "ksjkfkasdjfk hi how are you?");
  res.json({message:'sdhi how are you'});
});

// Endpoint to send OTP
app.get('/send-otp', (req, res) => {
  let email = req.query.email;
  email = "abhishekshringi.iitd@gmail.com";
  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars: false });

  const mailOptions = {
    from: 'sehajv@gmail.com',
    to: email,
    subject: 'Your OTP for authentication',
    text: `Your OTP is ${otp}.`,
  };
  console.log( mailOptions );
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'OTP sent successfully', otp : otp });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
