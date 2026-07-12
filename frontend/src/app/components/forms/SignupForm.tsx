import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/hooks/use-signup";
import {
  SignupPayloadSchema,
  signupSchema,
  SignupSchema,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {};

const SignupForm = (props: Props) => {
  const { error, handleSignup, loading } = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupPayloadSchema) => {
    try {
      const res = await handleSignup(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="login-form-firstName"
                  className="text-[16px] mb-2 justify-center"
                >
                  First Name
                </FieldLabel>
                <Input
                  {...field}
                  id="login-form-firstName"
                  aria-invalid={fieldState.invalid}
                  placeholder="Rob"
                  autoComplete="email"
                  className="py-6 px-4 rounded-sm"
                />
                <FieldDescription>Enter your First Name.</FieldDescription>
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
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="login-form-lastName"
                  className="text-[16px] mb-2 justify-center"
                >
                  First Name
                </FieldLabel>
                <Input
                  {...field}
                  id="login-form-lastName"
                  aria-invalid={fieldState.invalid}
                  placeholder="Rob"
                  autoComplete="email"
                  className="py-6 px-4 rounded-sm"
                />
                <FieldDescription>Enter your Last Name.</FieldDescription>
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="login-form-enail"
                  className="text-[16px] mb-2 justify-center"
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
                  className="text-[16px] mb-2 justify-center"
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
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="login-form-confirmPassword"
                  className="text-[16px] mb-2 justify-center"
                >
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="login-form-confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Re-enter you password."
                    type={showConfirmPassword ? "text" : "password"}
                    className="py-6 px-4 rounded-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>

                <FieldDescription>Re-Enter your Password</FieldDescription>
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
          className="py-3 px-14 text-[16px] h-auto w-auto mt-5 mb-5"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <div>{error && <p className="text-sm text-red-500">{error}</p>}</div>
      </form>
    </div>
  );
};

export default SignupForm;
