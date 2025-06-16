export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Welcome to your client management dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard cards would go here */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Clients
          </h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            128
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Jumlah pengguna yang terhubung dengan sistem sensor banjir.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Ketinggian
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            normal
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">50 cm</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            New Clients This Month
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            5
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Dibandingkan dengan bulan lalu.
          </p>
        </div>
      </div>
    </div>
  );
}
