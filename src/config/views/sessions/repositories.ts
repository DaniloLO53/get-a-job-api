import { prisma } from "@/config/database"

export async function insertSession(db_user_id: number) {
  return await prisma.session.create({
    data: {
      db_user_id,
    }
  })
}