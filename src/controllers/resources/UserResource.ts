import { Prisma } from '@prisma/client'

type User = Prisma.UserGetPayload<{
  include: {
    roles: true
  }
}>;
type RolesOnUsers = Prisma.RolesOnUsersGetPayload<{}>;

export class UserResource {

  formatModelArray(data: User[]): Array<{
    name: string,
    email: string,
    status: string,
    roles: RolesOnUsers[] | null
  }> {
    const collection = []
    if (Array.isArray(data)) {
      for (const key in data) {
        collection.push(this.formatModel(data[key])) 
      }

      return collection
    }

    return []
  }

  formatModel(data: User): {
    name: string,
    email: string,
    status: string,
    roles: RolesOnUsers[] | null
  } {
    return {
      'name': data.name,
      'email': data.email,
      'status': data.status,
      'roles': data.roles,
    }
  }
}
