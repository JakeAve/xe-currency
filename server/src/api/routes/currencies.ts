import { Router } from 'express'
import { Currencies } from '../../models/Currencies'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const curr = await Currencies.findOne().sort({ date: -1 }).exec()
    const currencies = curr['currencies']
    res.json({ currencies })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

export default router
