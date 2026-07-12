"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/hooks/use-login'
import { loginSchema, LoginSchema } from '@/schema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {}

const LoginForm = (props: Props) => {
    const router = useRouter()
    const { error, handleLogin, loading } = useLogin();

    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: LoginSchema) => {
      try {
        const res = await handleLogin(data);
        localStorage.setItem("userData", JSON.stringify(res))
        router.push("/feed");
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="login-form-enail"
                  className="text-[16px] mb-2 justify-center lg:justify-start"
                >
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="login-form-enail"
                  aria-invalid={fieldState.invalid}
                  placeholder="hello@world.com"
                  autoComplete="email"
                  className="py-6 px-4 rounded-sm"
                />
                <FieldDescription>Enter you email to log in.</FieldDescription>
                {fieldState.invalid && (
                  <FieldError
                    className="text-left"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="login-form-password"
                  className="text-[16px] mb-2 justify-center lg:justify-start"
                >
                  Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="login-form-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    autoComplete="password"
                    type={showPassword ? "text" : "password"}
                    className="py-6 px-4 rounded-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>

                <FieldDescription>Enter Password</FieldDescription>
                {fieldState.invalid && (
                  <FieldError
                    className="text-left"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          type="submit"
          className="py-3 px-14 text-[16px] h-auto w-auto mt-10 mb-15"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In Now"}
        </Button>
        <div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default LoginForm