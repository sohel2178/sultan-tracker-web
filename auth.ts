import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { IAccountDoc } from './database/account.model';
import { IUserDoc } from './database/user.model';
import { api } from './lib/api';
import { SignInSchema } from './lib/validation';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github,
    Google,
    Credentials({
      async authorize(credentials) {
        console.log('authorize Called');
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const { data: existingAccount } = (await api.accounts.getByProvider(
            email
          )) as ActionResponse<IAccountDoc>;

          if (!existingAccount) return null;

          const { data: existingUser } = (await api.users.getById(
            existingAccount.userId.toString()
          )) as ActionResponse<IUserDoc>;

          if (!existingUser) return null;

          const isValidPassword = await bcrypt.compare(
            password,
            existingAccount.password!
          );

          if (isValidPassword) {
            return {
              id: existingUser._id,
              name: existingUser.name,
              email: existingUser.email,
              image: existingUser.image,
            };
          }
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      // console.log("Session Called");
      // console.log(session, "Session");

      // console.log(token, "Token");
      session.user.id = token.sub as string;
      session.user.accountType = token.accountType as string;
      return session;
    },
    async jwt({ token, account }) {
      // console.log("Jwt Called");
      if (account) {
        const { data: existingAccount, success } =
          (await api.accounts.getByProvider(
            account.type === 'credentials'
              ? token.email!
              : account.providerAccountId
          )) as ActionResponse<IAccountDoc>;

        if (!success || !existingAccount) return token;

        const userId = existingAccount.userId;

        if (userId) {
          token.sub = userId.toString();
          token.accountType = existingAccount.accountType;
        }
      }

      return token;
    },
    async signIn({ user, account, profile }) {
      // console.log("signIn Called");
      if (account?.type === 'credentials') return true;
      if (!account || !user) return false;

      // console.log(profile, "Profile");

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === 'github'
            ? (profile?.login as string)
            : (user.name?.toLowerCase() as string),
      };

      const { success } = (await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as 'github' | 'google',
        providerAccountId: account.providerAccountId as string,
      })) as ActionResponse;

      if (!success) return false;

      return true;
    },
  },
});
