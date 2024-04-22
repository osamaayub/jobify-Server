require("express-async-errors");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const userRouter = require("./routes/User");
const authRouter = require("./routes/auth");
const JobsRouter = require("./routes/Job");
const path = require("path");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { msg: "IP rate limit exceded,retry in 15 minutes" }
});

__dirname = path.dirname(__filename);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));

  app.use(cors()); //cors
  app.use(cookieParser()); //cookie
  app.use(apiLimiter)
  app.use(express.json());
  app.use(helmet());
  app.use(mongoSanitize());

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
  });

  app.use('/api/v1/jobs', JobsRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/auth', authRouter);



  const port = process.env.PORT_NO || 8000;
  const mongoURL = process.env.MONGO_URI;


  mongoose.connect(mongoURL);
  app.listen(port, () => {
    console.log(`server is runnning ${port}`)
  });
}