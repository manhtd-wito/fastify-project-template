import { FastifyReply, FastifyRequest } from 'fastify'

export interface BaseMiddleware<T> {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<T>;
}
