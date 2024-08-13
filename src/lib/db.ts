import { PrismaClient } from '@prisma/client';

/* because of hot reload that next js doing in dev mode, we don't want to initialize a prisma client on every reload,
   so we use globalThis that don't get affected on hot reload.
*/

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
