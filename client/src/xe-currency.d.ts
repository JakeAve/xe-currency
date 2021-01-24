interface ExchangeRate {
  rate: number;
  date: Date;
}

interface Currency {
  name: string;
  code: CurrencyCode;
  symbol: string;
}

type CurrencyCode =
  | 'ALL'
  | 'AFN'
  | 'ARS'
  | 'AWG'
  | 'AUD'
  | 'AZN'
  | 'BSD'
  | 'BBD'
  | 'BYN'
  | 'BZD'
  | 'BMD'
  | 'BOB'
  | 'BAM'
  | 'BWP'
  | 'BGN'
  | 'BRL'
  | 'BND'
  | 'KHR'
  | 'CAD'
  | 'KYD'
  | 'CLP'
  | 'CNY'
  | 'COP'
  | 'CRC'
  | 'HRK'
  | 'CUP'
  | 'CZK'
  | 'DKK'
  | 'DOP'
  | 'XCD'
  | 'EGP'
  | 'SVC'
  | 'EUR'
  | 'FKP'
  | 'FJD'
  | 'GHS'
  | 'GIP'
  | 'GTQ'
  | 'GGP'
  | 'GYD'
  | 'HNL'
  | 'HKD'
  | 'HUF'
  | 'ISK'
  | 'INR'
  | 'IDR'
  | 'IRR'
  | 'IMP'
  | 'ILS'
  | 'JMD'
  | 'JPY'
  | 'JEP'
  | 'KZT'
  | 'KPW'
  | 'KRW'
  | 'KGS'
  | 'LAK'
  | 'LBP'
  | 'LRD'
  | 'MKD'
  | 'MYR'
  | 'MUR'
  | 'MXN'
  | 'MNT'
  | 'MZN'
  | 'NAD'
  | 'NPR'
  | 'ANG'
  | 'NZD'
  | 'NIO'
  | 'NGN'
  | 'NOK'
  | 'OMR'
  | 'PKR'
  | 'PAB'
  | 'PYG'
  | 'PEN'
  | 'PHP'
  | 'PLN'
  | 'QAR'
  | 'RON'
  | 'RUB'
  | 'SHP'
  | 'SAR'
  | 'RSD'
  | 'SCR'
  | 'SGD'
  | 'SBD'
  | 'SOS'
  | 'ZAR'
  | 'LKR'
  | 'SEK'
  | 'CHF'
  | 'SRD'
  | 'SYP'
  | 'TWD'
  | 'THB'
  | 'TTD'
  | 'TRY'
  | 'TVD'
  | 'UAH'
  | 'GBP'
  | 'USD'
  | 'UYU'
  | 'UZS'
  | 'VEF'
  | 'VND'
  | 'YER'
  | 'ZWD';
