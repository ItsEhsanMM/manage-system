import { z } from "zod";

export const clientSchema = z.object({
    name: z.string().min(3,"حداقل 3 کاراکتر وارد شود"),
    email: z.string().optional(),
    phoneNumber:z.number().optional(),
    salary: z.number()
})