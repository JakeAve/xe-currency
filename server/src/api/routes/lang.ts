import { Router } from 'express'
import languages from '../../lang/index'

const router = Router()

router.get('/available-langs', async (req, res) => {
  try {
    const availableLanguages = languages.map(({ code, name }) => ({
      code,
      name,
    }))
    res.json(availableLanguages)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

router.get('/:lang', async (req, res) => {
  try {
    const lang = req.params.lang
    const langObj = languages.find(({ code }) => code === lang)
    if (langObj) res.json(langObj)
    else res.sendStatus(404)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

export default router
