import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { createAdapter } from '@socket.io/redis-streams-adapter'
import { Redis } from 'ioredis'

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT) || 6379,
})

redisClient.on('connect', () => {
  console.log('Connected to Redis Cluster')
})

redisClient.on('ready', () => {
  console.log('Redis Cluster is ready')
})

redisClient.on('reconnecting', () => {
  console.log('Redis is reconnecting')
})

redisClient.on('close', () => {
  console.log('Redis connection closed')
})

redisClient.on('error', err => {
  console.error('Redis error:', err.message)
  process.exit(1)
})

export default function setupSocketConnection(httpServer: HTTPServer): void {
  try {
    const io = new IOServer(httpServer, {
      cors: {
        origin: process.env.ALLOWED_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      },
      adapter: createAdapter(redisClient),
    })

    // register channel
    // driverGpsChannel(io)
  } catch (err) {
    console.error('Failed to initialize Redis connection or Socket.io server:', err)
  }
}
