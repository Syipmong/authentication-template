"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/prisma/prisma";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    
      const validatedData = LoginSchema.parse(data);
  
      if (!validatedData) {
        return { error: "Invalid input data" };
      }
      const { email, password } = validatedData;
      const userExists = await prisma.user.findFirst({
        where: {
          email,
        },
      })
      if (!userExists || !userExists.password || !userExists.email) {
        return { error: "User does not exist" };
      }

      try{
        await signIn('credentials', {
            email: userExists.email,
            password: password,
            redirectTo: '/profile',
        })

      }catch(error){
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': {
                    return { error: "Invalid credentials" };
                }
                default: {
                    return {error: 'Please confirm your email address to sign in'}
                }

            }
          }
          throw error;

      }
    return { success: "User Logged in Successfully" };
     
}