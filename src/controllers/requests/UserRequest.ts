import { FastifyRequest } from 'fastify'

export type GetUserRequest = FastifyRequest<{
  Params: { id: string }
}>

export type CreateUserRequest = FastifyRequest<{
  Body: {
    name: string,
    email: string,
    password: string,
  }
}>
