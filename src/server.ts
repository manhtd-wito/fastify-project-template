import app from './app'
import prisma from './prisma'

const startServer = async () => {
  try {
    await prisma.$connect()
    console.log('Database connection successful!')
  } catch (err) {
    console.log('Unable to connect to the database:', err)
  }

  try {
    await app.listen({
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
      host: process.env.APP_URL || '0.0.0.0',
    })

    console.log(`Server running on http://${process.env.APP_URL || '0.0.0.0'}:${process.env.PORT}`)
  } catch (err) {
    console.error(err)
  }
}

startServer()
