import { z } from "zod";

export const clientSchema = z.object({
    name: z.string().min(3, "حداقل 3 کاراکتر وارد شود"),
    email: z.string().email("ایمیل معتبر وارد کنید").optional(),
    phoneNumber: z.string().optional(), // Changed from number to string
    salary: z.number(),
});
