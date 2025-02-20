'use server'

import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Client from '@/models/Client'
import { clientSchema } from '@/Schema/client'
import mongoose from 'mongoose'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const createClient = createServerAction()
  .input(clientSchema)
  .handler(async ({ input: { name, salary, email, phoneNumber } }) => {
    await connectDB()
    const manager = await auth()
    try {
      await Client.create({
        name,
        salary,
        email,
        phoneNumber,
        managerID: manager?.user?.id
      })
      revalidatePath('/dashboard/clients')
    } catch (error) {
      console.error(error)
    }
  })

export const getClients = createServerAction().handler(async () => {
  await connectDB()
  const currentUser = await auth()

  try {
    const clients = await Client.find({
      managerID: new mongoose.Types.ObjectId(currentUser?.user?.id)
    })
      .sort({ status: -1, joinDate: -1 })
      .exec()

    return JSON.stringify(clients)
  } catch (error) {
    console.error(error)
    return []
  }
})

export const clientStatistic = createServerAction().handler(async () => {
  await connectDB()
  const currentUser = await auth()

  try {
    const clients = await Client.find({
      managerID: new mongoose.Types.ObjectId(currentUser?.user?.id)
    })
      .sort({ status: 1, joinDate: -1 })
      .exec()

    const clientCount = clients.length
    let hired = 0
    let fired = 0

    clients.map(client => {
      if (client.status === 'hired') {
        hired += 1
      } else {
        fired += 1
      }
    })

    return JSON.stringify([
      {
        id: 0,
        content: 'کل کاربران',
        count: clientCount
      },
      {
        id: 1,
        content: 'استخدامی ها',
        count: hired
      },
      {
        id: 2,
        content: 'اخراجی ها',
        count: fired
      }
    ])
  } catch (error) {
    console.error(error)
    return [
      {
        id: 0,
        content: 'کل کاربران',
        count: 0
      },
      {
        id: 1,
        content: 'استخدامی ها',
        count: 0
      },
      {
        id: 2,
        content: 'اخراجی ها',
        count: 0
      }
    ]
  }
})

export const updateClient = createServerAction()
  .input(clientSchema.merge(z.object({ _id: z.string() })))
  .handler(async ({ input: { _id, name, salary, email, phoneNumber } }) => {
    await connectDB()

    try {
      await Client.updateOne(
        { _id },
        {
          $set: {
            name,
            salary,
            email,
            phoneNumber
          }
        }
      )

      revalidatePath('/dashboard/clients')
      return { success: true, message: 'Client updated successfully' }
    } catch (error) {
      return { success: false, message: 'Error updating client', error }
    }
  })

export const changeStatus = createServerAction()
  .input(z.string())

  .handler(async ({ input }) => {
    await connectDB()
    try {
      const client = await Client.findById(input)

      const newStatus = client!.status === 'hired' ? 'fired' : 'hired'
      await Client.findByIdAndUpdate(
        input,
        {
          status: newStatus
        },
        {
          new: true
        }
      )

      revalidatePath('/dashboard/clients')
    } catch (error) {
      return { success: false, message: 'Error updating client', error }
    }
  })
