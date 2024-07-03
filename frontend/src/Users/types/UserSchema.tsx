import { z } from "zod";
import { patterns } from "../../constants";

export const UserSchema = z.object({
  name: z.string().min(1, { message: "please type a username" }),
  email: z
    .string()
    .min(1, { message: "please type an email" })
    .refine((email) => patterns.email.test(email), {
      message: "email not valid",
    }),
  password: z
    .string()
    .min(1, { message: "please type a password" }),
    confirmPassword: z
    .string()
   
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords don't match",
        path: ['confirmPassword']
      });
    }
  });
export type userSchema = z.infer<typeof UserSchema>;
