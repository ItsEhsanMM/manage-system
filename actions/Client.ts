'use server'

import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Client from '@/models/Client'
import { clientSchema } from '@/Schema/client'
import mongoose from 'mongoose'
import { revalidatePath } from 'next/cache'
import { createServerAction } from 'zsa'

export const createClient = createServerAction()
  .input(clientSchema)
  .handler(async ({ input: { name, salary, email } }) => {
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
    revalidatePath('/dashboard/clients')
  })

export const getClients = createServerAction().handler(async () => {
  await connectDB()
  const currentUser = await auth()

  try {
    const clients = await Client.find({
      managerID: new mongoose.Types.ObjectId(currentUser?.user?.id)
    })
      .sort({ status: 1,joinDate:-1 }).exec()

    return JSON.stringify(clients)
  } catch (error) {
    console.error(error)
    return []
  }
})
