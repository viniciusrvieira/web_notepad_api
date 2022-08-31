import express from 'express';
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const PORT = 4000;
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app
  .use(express.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors(corsOptions))
  .use('/api', routes)
  .listen(PORT, () => {
    console.log(`Web Notepad is running on ${PORT}`);
  });
