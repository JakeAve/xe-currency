import { Router } from 'express'
import { Conversions } from '../../models/Conversions'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const {
      query: { base, quote },
    } = req
    const conv = await Conversions.findOne().sort({ created_at: -1 }).exec()
    const rate = conv['conversions'][`${base}:${quote}`]
    const date = conv['date']
    res.json({ rate, date })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

export default router
