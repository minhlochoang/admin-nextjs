import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";

const usersDB = [
  {
    name: 'username',
    email: 'user@gmail.com',
    password: '123123'
  }
]

const login = async (credentials) => {
  try {
    const user = usersDB.find(
      user => user.email === credentials.email && user.password === credentials.password
    );

    // if (!user) throw new Error('Wrong credentials')

    return user
  } catch (err) {
    console.error('Fail to fetch user: ',err);
    throw new Error("Failed to fetch user!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials)
          if (!user) return null
          return user
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
