import { prisma } from "@/config/database"

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