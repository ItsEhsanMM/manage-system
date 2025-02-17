import {z} from 'zod'

export const loginSchema = z.object({
    email:z.string().email({
        message: "آدرس ایمیل خود را وارد کنید"
    }),
    password: z.string().min(8,"رمز عبور حداقل باید 8 کاراکتر باشد")
})

export const registerSchema = z.object({
    name: z.string(),
    email:z.string().email(),
    password: z.string().min(8,"رمز عبور حداقل باید 8 کاراکتر باشد")
})