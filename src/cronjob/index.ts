import cron from 'node-cron'

export const cronJobs = () => {
  // Minute-based task: runs every minute
  cron.schedule('* * * * *', async () => {
    console.log('-- Start running cron job --')
  })
}
