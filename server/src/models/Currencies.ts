import { Schema, model } from 'mongoose';
import { CurrencyCodeSchema } from './CurrencyCode';

const CurrenciesSchema = new Schema({
  currencies: [
    {
      type: CurrencyCodeSchema,
    },
  ],
  date: Date,
});

export const Currencies = model('currencies', CurrenciesSchema);
