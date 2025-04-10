import { z } from 'zod'

// 1. Схема валидации для регистрации
export const SignupFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  email: z.string()
    .email({ message: 'Please enter a valid email' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Must contain at least one number' }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

// 2. Типы для формы
export type SignupFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
  }
  message?: string | null
}

export type FormState = {
  success?: boolean
  message?: string | null
  errors?: Record<string, string[]>
  timestamp?: number
}

// 3. Общие сообщения об ошибках
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Invalid email address',
  passwordMismatch: 'Passwords do not match',
  default: 'Something went wrong'
} as const

// 4. Тип для пользователя (пример)
export type User = {
  id: string
  name: string
  email: string
  createdAt: Date
}

// 5. Дополнительные схемы валидации (пример для логина)
export const LoginFormSchema = z.object({
  email: z.string().email({ message: ERROR_MESSAGES.invalidEmail }),
  password: z.string().min(6, { message: 'Minimum 6 characters required' })
})