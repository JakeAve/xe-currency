import fs from 'fs'

const rawCurrencies = fs.readFileSync(
  './src/lang/currencies/en-US.json',
  'utf8',
)
const currencies = JSON.parse(rawCurrencies)
const rawStrings = fs.readFileSync(
  './src/lang/translatedStrings/en-US.json',
  'utf8',
)
const strings = JSON.parse(rawStrings)

// JSON file
const lang = {
  code: 'en-US',
  name: 'English (US)',
  currencies,
  strings,
}

fs.writeFileSync(
  '../client/src/lang/default-lang.gen.json',
  JSON.stringify(lang),
)

console.log('Generated file in ../client/src/lang/default-lang.gen.json 🎊 🎉')

// TS file
const langTS = `
export interface TranslatedStrings {
  ${Object.keys(strings)
    .map((key) => `${key}: string;`)
    .join('\n  ')}
}`

fs.writeFileSync('../client/src/lang/default-lang.gen.ts', langTS)

console.log('Generated file in ../client/src/lang/default-lang.gen.ts 🎊 🎉')
