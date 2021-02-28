import { Schema, model } from 'mongoose'
import { CurrencyCodeSchema } from './CurrencyCode'

const CurrenciesSchema = new Schema({
  currencies: [
    {
      type: String,
      uppercase: true,
      maxlength: 3,
      minlength: 3,
    },
  ],
  date: Date,
})

export const Currencies = model('currencies', CurrenciesSchema)
