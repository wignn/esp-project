"use client"

import { useState, useEffect } from "react"
import { AdminForm } from "@/components/admin-form"
import { Modal } from "@/components/modal"
import { fetchClients, deleteClient } from "@/lib/actions/client-action"
import { PlusCircle, Edit, Trash2, Search, UserCircle, Loader2 } from "lucide-react"

type Client = {
  id: string
  name: string
  address: string
  phone: string
}

export default function ClientListPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  // Fetch clients on component mount
  useEffect(() => {
    loadClients()
  }, [])

  // Filter clients when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredClients(clients)
    } else {
      const lowercasedSearch = searchTerm.toLowerCase()
      setFilteredClients(
        clients.filter(
          (client) =>
            client.name.toLowerCase().includes(lowercasedSearch) ||
            client.address.toLowerCase().includes(lowercasedSearch) ||
            client.phone.includes(searchTerm),
        ),
      )
    }
  }, [searchTerm, clients])

  async function loadClients() {
    try {
      setIsLoading(true)
      const data = await fetchClients()
      setClients(data)
      setFilteredClients(data)
    } catch (error) {
      console.error("Error loading clients:", error)
      setNotification({
        type: "error",
        message: "Failed to load clients. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle client deletion
  async function handleDeleteClient(id: string) {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(id)
        setClients(clients.filter((client) => client.id !== id))
        setNotification({
          type: "success",
          message: "Client deleted successfully.",
        })
      } catch (error) {
        console.error("Error deleting client:", error)
        setNotification({
          type: "error",
          message: "Failed to delete client. Please try again.",
        })
      }
    }
  }

  // Function to open edit modal
  function handleEditClient(client: Client) {
    setEditingClient(client)
    setIsModalOpen(true)
  }

  // Function to open add new client modal
  function handleAddNewClient() {
    setEditingClient(null)
    setIsModalOpen(true)
  }

  // Function to handle form submission success
  function handleFormSuccess() {
    setIsModalOpen(false)
    loadClients()
    setNotification({
      type: "success",
      message: editingClient ? "Client updated successfully." : "New client added successfully.",
    })
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your client information</p>
        </div>
        <button
          onClick={handleAddNewClient}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New Client
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search clients by name, address or phone..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Loading clients...</span>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
            <UserCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No clients found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm ? "No clients match your search criteria." : "Add a new client to get started."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{client.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{client.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{client.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEditClient(client)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
                          aria-label={`Edit ${client.name}`}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-1"
                          aria-label={`Delete ${client.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for adding/editing clients */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingClient ? `Edit Client: ${editingClient.name}` : "Add New Client"}
      >
        <AdminForm initialData={editingClient || undefined} onSuccess={handleFormSuccess} />
      </Modal>
      {/* Notification Banner */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-lg font-semibold hover:opacity-70"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

