"use server"

import { revalidatePath } from "next/cache"
import {prisma} from "@/lib/prisma"

interface ClientRequest {
  name: string
  address: string
  phone: string
}


interface ClientResponse extends ClientRequest{
  id: string
  createdAt: Date
  updatedAt: Date
}

export async function fetchClients(): Promise<ClientResponse[]> {
  const clients = await prisma.client.findMany()
  
  revalidatePath("/clients")
  return clients
}

export async function deleteClient(id: string): Promise<void> {
  await prisma.client.delete({
    where: {
      id: id
    }
  })

  
  revalidatePath("/clients")
}

export async function addClient(data: Omit<ClientRequest, "id">): Promise<ClientResponse> {
  const cl = await prisma.client.count({
    where: {
      phone: data.phone
    }
  })

  if(cl > 0) {
    throw new Error("Client with phone number already exists")
  }

  const client = await prisma.client.create({
    data: data
  })

  revalidatePath("/clients")
  return client
}

export async function updateClient(id: string, data: Omit<ClientRequest, "id">): Promise<ClientResponse> {
  const client = await prisma.client.update({
    where: {
      id: id
    },
    data: data
  })

  revalidatePath("/clients")
  return client
}

