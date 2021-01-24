import express from 'express';
import api from './api';
import request from './utilities/request';

const app = express();

app.use('/api', api);

app.get('/', (req, res) => {
  console.log('hitit');
  res.sendStatus(200);
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

server.on('error', (err) => console.error(err));
