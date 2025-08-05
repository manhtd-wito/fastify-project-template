import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import routes from './routes'
import jwt from './jwt'
import loggerConfig from './logger'
import requestContext from '@fastify/request-context'
import fastifyAuth from '@fastify/auth'
import { cronJobs } from './cronjob'
import { Server as HTTPServer } from 'http'
import setupSocketConnection from './socket'

dotenv.config()

const app: FastifyInstance = fastify({
  logger: loggerConfig,
})

// register cors
app.register(cors, {
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

// register context
app.register(requestContext)

// register jwt
app.register(jwt)

// register auth
app.register(fastifyAuth)

// register socket
const httpServer: HTTPServer = app.server
setupSocketConnection(httpServer)

app.get('/', async () => {
  return {
    message: 'server online',
  }
})

app.register(routes, { prefix: '/api' })

cronJobs()

app.addHook('onError', async (request, reply, error) => {
  app.log.error(error)
  if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
    reply.status(400).send({ error: 'Invalid request to PrismaClient' })
  }
})

export default app
