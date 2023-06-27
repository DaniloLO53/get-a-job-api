import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const LIST_QUANTITY = 7;

export async function findJobs() {
  return await prisma.job.findMany({
    include: {
      company: true
    }
  });
}

export async function findJobsWithQueries({ searchQuery }: any) {
  return await prisma.job.findMany({
    take: LIST_QUANTITY,
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

export async function findJobsWithQueriesOffset({ searchQuery, myCursor }: any) {
  return await prisma.job.findMany({
    take: LIST_QUANTITY,
    skip: 1,
    cursor: {
      id: myCursor,
    },
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
