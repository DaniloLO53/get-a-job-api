import { prisma } from "@/config";

export async function findJobs() {
  return await prisma.job.findMany({
    include: {
      company: true
    }
  });
}