import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from './auth.config';
import { db } from './lib/db';
import { getUserById } from './data/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      console.log('🚀 ~ signIn ~ signIn:', signIn);
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

      if (user.id) {
        const existingUser = await getUserById(user.id);

        if (!existingUser?.emailVerified) return false;
      }

      // TODO : ADD 2FA check

      return true;
    },
    async jwt({ token }) {
      console.log('🚀 ~ jwt ~ jwt:');
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    async session({ token, session }) {
      console.log('🚀 ~ session ~ session:');
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      console.log('🚀 ~ linkAccount ~ linkAccount:');
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
});
