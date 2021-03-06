import * as dotenv from 'dotenv'
dotenv.config({ path: process.cwd() + '/.env' })

import request from '../../utilities/request'
import { Currencies } from '../../models/Currencies'
import { Conversions } from '../../models/Conversions'
import connectDB from '../../db/connectDB'
interface ExchangeObject {
  success: boolean
  timestamp: number
  base: string
  rates: any
}

const read = async () => {
  try {
    const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_RATES_API_IO_KEY}`
    const json = await request(url, { method: 'GET' })
    const euroObj: ExchangeObject = JSON.parse(json)

    const currencies = Object.keys(euroObj.rates)
    const otherObjs = await Promise.all(
      currencies.map(async (c) => {
        const response = await request(url + '&base=' + c, { method: 'GET' })
        return JSON.parse(response)
      }),
    )
    const data = [euroObj, ...otherObjs]

    const { rates, base, timestamp: dateString } = euroObj
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
      success: true,
      data: {
        currencies: [...currencies, 'EUR'],
        conversions: { ...conversions, 'EUR:EUR': 1 },
        date,
      },
    }
  } catch (err) {
    console.error(err)
    return { success: false, data: null }
  }
}

const write = async ({ currencies: currs, conversions: convs, date }) => {
  try {
    const currencies = new Currencies({
      currencies: currs,
      date,
    })

    await currencies.save()
    console.log('Saved new currencies 🎊 🎉')

    const conversions = new Conversions({
      conversions: convs,
      date,
    })

    await conversions.save()
    console.log('Saved new conversions 🎊 🎉')
  } catch (err) {
    console.error(err)
  }
}

const scrape = async () => {
  try {
    await connectDB()
    const { data } = await read()
    if (data) await write(data)
    else throw new Error('Could not fetch data, see error above.')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

scrape()
