import { FastifyInstance } from 'fastify'

import userRoutes from './userRoutes'

const routes = async (fastify: FastifyInstance) => {
  fastify.register(userRoutes)
}

export default routes
