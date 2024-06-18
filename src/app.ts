import fastify, { FastifyInstance } from 'fastify'
import userRoutes from './routes/userRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app: FastifyInstance = fastify({
  logger: { 
    level: 'info', 
    file: process.env.LOG_FILE  || './logs/app.log',
  },
})

app.register(userRoutes)

app.get('/', async () => {
  return {
    message: 'server online',
  }
})

app.addHook('onError', async (request, reply, error) => {
  app.log.error(error)
  if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
    reply.status(400).send({ error: 'Invalid request to PrismaClient' })
  }
})

export default app
