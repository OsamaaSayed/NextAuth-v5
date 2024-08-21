import { db } from '@/lib/db';

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return passwordResetToken;
  } catch (err) {
    console.log('🚀 ~ getPasswordResetTokenByEmail ~ err:', err);
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch (err) {
    console.log('🚀 ~ getPasswordResetTokenByToken ~ err:', err);
  }
};
