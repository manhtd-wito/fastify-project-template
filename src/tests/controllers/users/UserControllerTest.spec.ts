import { FastifyInstance } from 'fastify'
import app from '../../../app'

describe('Get User List Test', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = app
  })

  afterAll(async () => {
    await server.close()
  })

  test('GET /users returns 200', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/users',
    })

    const responseData = JSON.parse(response.payload)

    expect(response.statusCode).toBe(200)
    expect(responseData).toHaveProperty('users')
    expect(responseData).toHaveProperty('message')
  })
})
