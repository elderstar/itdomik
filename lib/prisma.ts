// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => new PrismaClient()

declare global {
  let prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = prismaClientSingleton()

export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma