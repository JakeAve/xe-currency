module.exports = {
  apps: [
    { name: 'xe-api', script: 'npm start' },
    {
      name: 'scraper',
      cron_restart: '0 0 * * *',
      script: 'npm run scrape-0',
    },
  ],
}
