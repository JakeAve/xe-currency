import * as dotenv from 'dotenv'
dotenv.config({ path: process.cwd() + '/.env' })

import request from '../../utilities/request'
import { Currencies } from '../../models/Currencies'
import { Conversions } from '../../models/Conversions'
import connectDB from '../../db/connectDB'

interface APIObject {
  result: string
  documentation: string
  terms_of_use: string
  time_last_update_unix: number
  time_last_update_utc: string
  time_next_update_unix: number
  time_next_update_utc: string
  base_code: string
  conversion_rates: any
}

const read = async () => {
  try {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest`
    const json = await request(`${url}/EUR`, { method: 'GET' })
    const euroObj: APIObject = JSON.parse(json)

    const currencies = Object.keys(euroObj.conversion_rates)
    console.log({ currencies })

    const otherObjs = await Promise.all(
      currencies.map(async (c) => {
        const response = await request(`${url}/${c}`, { method: 'GET' })
        return JSON.parse(response)
      }),
    )
    const data: APIObject[] = [euroObj, ...otherObjs]
    console.log({ data })

    const {
      conversion_rates,
      base_code,
      time_last_update_utc: dateString,
    } = euroObj
    const date = new Date(dateString)
    const symbols = [...Object.keys(conversion_rates), base_code]
    const conversions = {}

    for (const s1 of symbols) {
      const { conversion_rates: s1Rates } = data.find(
        ({ base_code }) => base_code === s1,
      )
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
