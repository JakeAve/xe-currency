import dotenv from 'dotenv'
dotenv.config()

import request from '../../utilities/request'
import { Currencies } from '../../models/Currencies'
import { Conversions } from '../../models/Conversions'
import connectDB from '../../db/connectDB'

const read = async () => {
  try {
    const url = `https://api.exchangeratesapi.io/latest`
    const json = await request(url, { method: 'GET' })
    const euroObj = JSON.parse(json)

    const currencies = Object.keys(euroObj.rates)
    const otherObjs = await Promise.all(
      currencies.map(async (c) => {
        const response = await request(url + '?base=' + c, { method: 'GET' })
        return JSON.parse(response)
      }),
    )
    const data = [euroObj, ...otherObjs]

    const { rates, base, date: dateString } = euroObj
    const date = new Date(dateString)
    const symbols = [...Object.keys(rates), base]
    const conversions = {}

    for (const s1 of symbols) {
      const { rates: s1Rates } = data.find(({ base }) => base === s1)
      for (const [s2, num] of Object.entries(s1Rates)) {
        const key = `${s1}:${s2}`
        conversions[key] = num
      }
    }

    return {
      currencies: [...currencies, 'EUR'],
      conversions: { ...conversions, 'EUR:EUR': 1 },
      date,
    }
  } catch (err) {
    console.error(err)
  }
}

const write = async ({ currencies: currs, conversions: convs, date }) => {
  try {
    const currencies = new Currencies({
      currencies: currs,
      date,
    })

    await currencies.save()
    console.log('Saved new currencies')

    const conversions = new Conversions({
      conversions: convs,
      date,
    })

    await conversions.save()
    console.log('Saved new conversions')
  } catch (err) {
    console.error(err)
  }
}

const scrape = async () => {
  try {
    await connectDB()
    const data = await read()
    await write(data)
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

scrape()
