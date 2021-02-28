import { Schema } from 'mongoose'

export const CurrencyCodeSchema = new Schema({
  type: String,
  uppercase: true,
  maxlength: 3,
  minlength: 3,
})
