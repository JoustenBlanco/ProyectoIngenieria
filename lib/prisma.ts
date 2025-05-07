// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Usamos una variable global para evitar instancias múltiples en producción
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
