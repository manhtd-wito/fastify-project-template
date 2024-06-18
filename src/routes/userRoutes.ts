import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import UserController from '../controllers/users/UserController'

const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const userController = new UserController()

  fastify.get('/users', userController.index)
  fastify.get('/users/:id', userController.show)
  fastify.post('/users', 
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', maxLength: 191 },
            email: { type: 'string', maxLength: 300, format: 'email' },
            password: { type: 'string', maxLength: 20, minLength: 8 },
          },
          required: ['name', 'email', 'password'],
        },
      },
    }, userController.store)
}

export default userRoutes
