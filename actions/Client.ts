'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { clientSchema } from '@/Schema/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const createClient = createServerAction()
  .input(clientSchema)
  .handler(async ({ input: { name, salary, email, phoneNumber } }) => {
    const manager = await auth()
    try {
      await prisma.client.create({
        data: {
          name,
          salary,
          email,
          phoneNumber: phoneNumber?.toString() || null,
          managerID: manager?.user?.id || ''
        }
      })
      revalidatePath('/dashboard/clients')
    } catch (error) {
      console.error(error)
    }
  })

export const getClients = createServerAction().handler(async () => {
  const currentUser = await auth()
  try {
    const clients = await prisma.client.findMany({
      where: { managerID: currentUser?.user?.id || '' },
      orderBy: [{ status: 'asc' }, { joinDate: 'desc' }]
    })
    return JSON.stringify(clients)
  } catch (error) {
    console.error(error)
  }
})

export const clientStatistic = createServerAction().handler(async () => {
  const currentUser = await auth()
  try {
    const clients = await prisma.client.findMany({
      where: { managerID: currentUser?.user?.id || '' },
      orderBy: [{ status: 'asc' }, { joinDate: 'desc' }]
    })
    const clientCount = clients.length
    const hired = clients.filter(client => client.status === 'HIRED').length
    const fired = clients.filter(client => client.status === 'FIRED').length
    return JSON.stringify([
      { id: 0, content: 'کل کاربران', count: clientCount },
      { id: 1, content: 'استخدامی ها', count: hired },
      { id: 2, content: 'اخراجی ها', count: fired }
    ])
  } catch (error) {
    console.error(error)
    return [
      { id: 0, content: 'کل کاربران', count: 0 },
      { id: 1, content: 'استخدامی ها', count: 0 },
      { id: 2, content: 'اخراجی ها', count: 0 }
    ]
  }
})

export const updateClient = createServerAction()
  .input(clientSchema.merge(z.object({ id: z.string() })))
  .handler(async ({ input: { id, name, salary, email, phoneNumber } }) => {
    try {
      await prisma.client.update({
        where: { id },
        data: { name, salary, email, phoneNumber: phoneNumber?.toString() || null }
      })
      revalidatePath('/dashboard/clients')
      return { success: true, message: 'Client updated successfully' }
    } catch (error) {
      return { success: false, message: 'Error updating client', error }
    }
  })

export const changeStatus = createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    try {
      const client = await prisma.client.findUnique({ where: { id: input } })
      if (!client) return { success: false, message: 'Client not found' }
      const newStatus = client.status === 'HIRED' ? 'FIRED' : 'HIRED'
      await prisma.client.update({ where: { id: input }, data: { status: newStatus } })
      revalidatePath('/dashboard/clients')
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Error updating client', error }
    }
  })
