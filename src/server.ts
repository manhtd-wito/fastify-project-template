import app from './app'

const startServer = async () => {
  try {
    await app.listen({
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
      host: process.env.APP_URL || '127.0.0.1',
    })
    console.log(`Server running on ${process.env.APP_URL}:${process.env.PORT}`)
  } catch (err) {
    console.error(err)
  }
}

startServer()
