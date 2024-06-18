import { FastifyInstance } from 'fastify'
import app from '../app'

describe('Example Test', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = app
  })

  afterAll(async () => {
    await server.close()
  })

  test('GET / returns 200', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.statusCode).toBe(200)
  })
})
