import { PrismaClient } from '@prisma/client'
import { readReplicas } from '@prisma/extension-read-replicas'
import loggerConfig from './logger'
import pino from 'pino'
import { requestContext } from '@fastify/request-context'

const logger = pino(loggerConfig)

const prisma = new PrismaClient()
  .$extends(readReplicas({ url: process.env.DATABASE_URL_REPLICA || process.env.DATABASE_URL || '' }))
  .$extends({
    query: {
      $allModels: {
        $allOperations: async ({ model, operation, args, query }) => {
          // define prisma action
          const actionDB = [
            'create',
            'createMany',
            'createManyAndReturn',
            'update',
            'updateMany',
            'upsert',
            'delete',
            'deleteMany',
          ]
          let logQuery = ''

          if (actionDB.includes(operation)) {
            logQuery = `Prisma | ${model}.${operation} ${JSON.stringify(args)}`
          }

          try {
            const result = await query(args)

            if (actionDB.includes(operation)) {
              logger.info(logQuery)
            }

            return result
          } catch (error) {
            logger.error(error)
            throw error
          }
        },
      },
    },
  })

export default prisma
