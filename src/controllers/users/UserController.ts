import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { UserResource } from '../resources/UserResource'
import type { GetUserRequest, CreateUserRequest } from '../requests/UserRequest'
import type { BaseController } from '../BaseController'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default class UserController implements BaseController {
  public async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const users = await prisma.user.findMany({
      include: { roles: true },
    })

    return reply.send({
      'users': (new UserResource()).formatModelArray(users),
      'message': 'Get users successfully',
    })
  }

  public async show(request: GetUserRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.params
    const user = await prisma.user.findFirst({
      where: { id: parseInt(id) },
      include: { roles: true },
    })

    if (user === null) {
      return reply.status(404).send({ error: 'User not found' })
    }

    return reply.send({
      'user': (new UserResource()).formatModel(user),
      'message': 'Get user successfully',
    })
  }

  public async store(request: CreateUserRequest, reply: FastifyReply): Promise<void> {
    const { name, email, password } = request.body
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        status: 'ACTIVE',
        password: bcrypt.hashSync(password, 10),
      },
      include: { roles: true },
    })

    return reply.send({
      'user': (new UserResource()).formatModel(user),
      'message': 'Create user successfully',
    })
  }
}
