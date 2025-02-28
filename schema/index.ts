import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Please enter a valid password",
    }),
})