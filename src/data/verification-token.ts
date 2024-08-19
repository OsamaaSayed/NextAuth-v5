import { db } from '@/lib/db';

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (err) {
    console.log('🚀 ~ getVerificationTokenByEmail ~ err:', err);
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (err) {
    console.log('🚀 ~ getVerificationTokenByToken~ err:', err);
  }
};
