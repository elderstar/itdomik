'use client'

import { useActionState } from "react";
import { signUp } from '@/app/api/register/route'

export default function SignupForm() {
  const [state, formAction] = useActionState(signUp, {
    message: '',
    errors: {}
  })

  return (
    <div>

    <form action={formAction} className="space-y-6">
      <div>
        <label className="block text-sm/6 font-medium text-gray-900">Name</label>
        <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"name="name"/>
        {state.errors?.name && <p className="text-red-600">{state.errors.name.join(', ')}</p>}
      </div>

      <div>
        <label className="block text-sm/6 font-medium text-gray-900">Email</label>
        <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"name="email"/>
        {state.errors?.email && <p className="text-red-600">{state.errors.email.join(', ')}</p>}
      </div>

      <div>
        <label className="block text-sm/6 font-medium text-gray-900">Password</label>
        <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"type="password" name="password" />
        {state.errors?.password && <p className="text-red-600">{state.errors.password.join(', ')}</p>}
      </div>

      <div>
        <label className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
        <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"type="password" name="confirmPassword"/>
        {state.errors?.confirmPassword && <p className="text-red-600">{state.errors.confirmPassword.join(', ')}</p>}
      </div>

      {state.message && <p className="text-red-600">{state.message}</p>}

      <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Sign Up</button>
    </form>
      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Already have account?
        <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Sign In</a>
      </p>
    </div>
  )
}