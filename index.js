require('dotenv').config();
const express = require('express');
const axios = require('axios');

const port = process.env.PORT || 3000;
const url = 'https://yesno.wtf/api';

const app = express();

app.get('/random', async (req, res) => {
  const { data } = await axios(url);
  if (data.answer === 'no') {
    res.status(200).send({ result: false });
  } else if (data.answer === 'yes') {
    res.status(200).send({ result: true });
  } else {
    res.status(500).send({ result: false });
  }
  res.end();
});

app.get('/healthz', async (req, res) => {
  const response = await head(url);
  if (response.status === 200) {
    return res.sendStatus(200);
  }
  return res.sendStatus(500);
});

const server = app.listen(port);

process.on('SIGTERM', () => {
  server.close();
  process.exit(0);
});
