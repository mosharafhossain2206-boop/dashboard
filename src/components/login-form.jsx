"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../utils/axios";
import { useNavigate } from "react-router";

// ✅ Zod Schema (email or phone in one field)
const LoginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone number is required")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^01[3-9]\d{8}$/.test(val),
      "Enter a valid email or Bangladeshi phone number"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[@$!%*?&]/, "Must include a special character"),
});

export function LoginForm({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values) => {
    // ✅ Detect email or phone
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.identifier);
    const isPhone = /^01[3-9]\d{8}$/.test(values.identifier);

    const payload = {
      email: isEmail ? values.identifier : null,
      phone: isPhone ? values.identifier : null,
      password: values.password,
    };

    try {
      const response = await api.post("/auth/login", payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.status === "Ok") {
        console.log("🟢 Login Success:", response.data.data.data);
        localStorage.setItem(
          "acceesToken",
          response.data.data.data.acceesToken
        );
        navigate("/");
      }
    } catch (error) {
      console.error("🔴 Login Error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email or phone number below to log in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Email or Phone */}
              <Field>
                <FieldLabel htmlFor="identifier">Email or Phone</FieldLabel>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="m@example.com or 017xxxxxxxx"
                  {...register("identifier")}
                />
                {errors.identifier && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.identifier.message}
                  </p>
                )}
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff size={18} strokeWidth={1.8} />
                    ) : (
                      <Eye size={18} strokeWidth={1.8} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              {/* Buttons */}
              <Field>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" type="button" className="w-full mt-2">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
