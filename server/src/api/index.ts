import { Router } from 'express'

import convert from './routes/convert'
import currencies from './routes/currencies'
import lang from './routes/lang'

const router = Router()

router.use('/convert', convert)
router.use('/currencies', currencies)
router.use('/lang', lang)

export default router
