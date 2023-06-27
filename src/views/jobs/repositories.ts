import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

export async function findJobs() {
  return await prisma.job.findMany({
    include: {
      company: true
    }
  });
}

export async function findJobsWithQueries({ searchQuery }: any) {
  return await prisma.job.findMany({
    include: {
      company: true
    },
    where: {
      title: {
        contains: searchQuery,
        mode: Prisma.QueryMode.insensitive
      }
    }
  });
}