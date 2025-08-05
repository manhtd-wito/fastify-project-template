import { FastifyInstance, FastifyRequest } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || '',
    verify: { extractToken: (request: FastifyRequest) => request.headers.authorization },
  })
})
