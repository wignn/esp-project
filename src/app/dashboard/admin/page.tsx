import { AdminForm } from "@/components/admin-form"
import { UserPlus } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <UserPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Registration</h1>
          <p className="text-gray-500 dark:text-gray-400">Add new clients to your database</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Client Information</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the clients details below. All fields are required.
          </p>
        </div>
        <div className="p-6">
          <AdminForm />
        </div>
      </div>
    </div>
  )
}

