import { Schema } from 'mongoose';

export const CurrencyCodeSchema = new Schema({
  code: {
    type: String,
    trim: true,
    uppercase: true,
    required: true,
    maxlength: 3,
    minlength: 3,
  },
});
