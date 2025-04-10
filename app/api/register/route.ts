'use server'

import { SignupFormSchema } from '@/lib/definitions'
// import { z } from 'zod'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import { AuthError } from '@/lib/errors'
// import { JsonValue } from '@prisma/client/runtime/library'

const prisma = new PrismaClient()
// let user: { profile: JsonValue | null, email: string; password: string; } | null;
let user: null = null;

type FormState = {
  message?: string | null
  errors?: Record<string, string[]>
  success?: boolean
}

export async function signUp(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
    try {
    // 1. Валидация формы
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    })

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Please fix the errors below'
      }
    }

    const { name, email, password } = validatedFields.data

    const profile = JSON.stringify({name : name});

    // 2. Проверка существующего пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      // throw new AuthError('User with this email already exists')
      return {
        success: false,
        message: 'User with this email already exists'
      }
    }

    // 3. Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. Создание пользователя
    user = await prisma.user.create({
      data: {
        profile,
        email,
        password: hashedPassword
      }
    })

    // 5. Редирект после успешной регистрации
    return {
      success: true,
      message: 'Registration successful! Redirecting...'
    }
  } catch (error) {
    console.error('Database Error:', error);
    // Обработка ошибок
    if (error instanceof AuthError) {
      return {
        success: false,
        message: error.message
      }
    }

    // if (error instanceof z.ZodError) {
    //   return {
    //     success: false,
    //     errors: error.flatten().fieldErrors,
    //     message: 'Validation failed'
    //   }
    // }

    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    }
  } finally {
    await prisma.$disconnect()
    console.log(user);
    if(user !== null)
    {
      user = null
      // Object.keys(user).forEach(key => delete user[key]);
      redirect('/dashboard')
    }
  }
}