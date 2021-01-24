import { Router } from 'express';

import convert from './routes/convert';
import currencies from './routes/currencies';

const router = Router();

router.use('/convert', convert);
router.use('/currencies', currencies);

export default router;
