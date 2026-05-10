import { z } from "zod";

export const signupScheema = z.object({
    username: z.string().min(3),
    email: z.email(), // Fixed: z.string().email()
    password: z.string().min(3),
});

export const signinScheema = z.object({
    email: z.email(), // Fixed
    password: z.string().min(3),
});