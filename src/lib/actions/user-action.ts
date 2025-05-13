"use server"

import { revalidatePath } from "next/cache"

// Define the user data type
type UserData = {
  name: string
  address: string
  phoneNumber: string
}

export async function saveUserData(data: UserData) {
  try {
    // Here you would typically connect to your database
    // and save the user data
    console.log("Saving user data:", data)

    // Example database operation (replace with your actual database code)
    // const result = await db.users.create({
    //   data: {
    //     name: data.name,
    //     address: data.address,
    //     phoneNumber: data.phoneNumber,
    //   },
    // })

    // Simulate a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the admin page to reflect the new data
    revalidatePath("/admin")

    return { success: true }
  } catch (error) {
    console.error("Error saving user data:", error)
    throw new Error("Failed to save user data")
  }
}

