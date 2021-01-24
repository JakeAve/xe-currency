import { Router } from 'express';
import fs from 'fs';

const router = Router();

router.get('/', (req, res) => {
  try {
    const {
      query: { base, quote },
    } = req;
    const files = fs.readdirSync('./src/data/currencies');
    const fileName = files.slice(-1);
    const data = require(`../../data/convert/${fileName}`);
    const rate = data.rates[`${base}:${quote}`];
    const date = data.date;
    res.json({ rate, date });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
