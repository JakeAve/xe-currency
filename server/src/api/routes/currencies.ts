import { Router } from 'express';
import fs from 'fs';

const router = Router();

router.get('/', (req, res) => {
  try {
    const files = fs.readdirSync('./src/data/currencies');
    const fileName = files.slice(-1);
    const currencies = require(`../../data/currencies/${fileName}`);
    res.json({ currencies });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
