import {z} from "zod";

export const signupScheema = z.object({
    userName: z.string().min(3),
    email: z.email(),
    password: z.string().min(6)
})