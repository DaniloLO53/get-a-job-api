import { prisma } from "@/config"

export async function insertUser(email: string, password: string | null) {
  return await prisma.user.create({
    data: {
      email,
      password
    }
  })
}

export async function findUser(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    }
  })
}

export async function deleteSession(db_user_id: number) {
  return await prisma.session.deleteMany({
    where: {
      db_user_id
    }
  })
}