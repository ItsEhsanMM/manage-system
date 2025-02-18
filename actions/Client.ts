"use server"

import { auth } from "@/auth"
import connectDB from "@/lib/db"
import Client from "@/models/Client"
import { clientSchema } from "@/Schema/client"
import { revalidatePath } from "next/cache"
import { createServerAction } from "zsa"

export const createClient = createServerAction().input(clientSchema).handler(async ({input:{name,salary,email}}) => {
    await connectDB()
    const manager = await auth()
    try {
        Client.create({
            name,
            salary,
            email,
            managerID: manager?.user?.id
        })
    } catch (error) {
        console.error(error)
    }
    revalidatePath("/dashboard/clients")
})