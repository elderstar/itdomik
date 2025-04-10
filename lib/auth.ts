import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { Redis } from "ioredis"
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter"

const prisma = new PrismaClient()
const redis = new Redis(process.env.REDIS_URL!)

export const authOptions: NextAuthOptions = {
  // 1. Адаптер для работы с БД
  adapter: UpstashRedisAdapter(redis) || PrismaAdapter(prisma),

  // 2. Провайдеры аутентификации
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        })
        
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return user
        }
        return null
      }
    }),
    // Дополнительные провайдеры
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })
  ],

  // 3. Настройки сессии
  session: {
    strategy: "jwt", // Используем JWT вместо сессий БД
    maxAge: 30 * 24 * 60 * 60 // 30 дней
  },

  // 4. Callback-функции
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    }
  },

  // 5. Обработчики событий
  events: {
    async signIn(message) {
      console.log(`User ${message.user.email} logged in`)
    },
    async signOut({ session }) {
      console.log(`User ${session.user.email} logged out`)
    }
  },

  // 6. Настройки безопасности
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },

  // 7. Кастомизация страниц
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },

  // 8. Debug-режим
  debug: process.env.NODE_ENV === "development"
}