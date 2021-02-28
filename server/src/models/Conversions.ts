import { Schema, model } from 'mongoose'

const ConversionsSchema = new Schema({
  conversions: {},
  date: Date,
})

export const Conversions = model('conversions', ConversionsSchema)
