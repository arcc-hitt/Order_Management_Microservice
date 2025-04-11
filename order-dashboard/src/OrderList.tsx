import { useState } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { api } from './api'

// --- Types ---
interface Order {
  id: number
  customerName: string
  itemName: string
  quantity: number
  price: number
}

interface PaginatedOrders {
  content: Order[]
  number: number      // current page (0‑based)
  totalPages: number
  first: boolean
  last: boolean
}

export default function OrderList() {
  const qc = useQueryClient()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')

  // --- 1) useQuery without keepPreviousData, using placeholderData instead ---
  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<PaginatedOrders, Error> = useQuery({
    queryKey: ['orders', page, search],
    queryFn: () =>
      api
        .get<PaginatedOrders>('/orders', {
          params: { page, size: 10, customer: search },
        })
        .then(res => res.data),
    // keep previous data in UI while fetching new page
    placeholderData: prev => prev,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // --- 2) delete mutation with v5 signature ---
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/orders/${id}`),
    onSuccess: () => {
      // invalidate the 'orders' query so it refetches
      qc.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  if (isLoading) return <p className="text-center py-4">Loading…</p>
  if (isError) return <p className="text-center py-4 text-red-600">Error: {error.message}</p>

  return (
    <div className="bg-gray-400 p-6 rounded-lg shadow-md">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center mb-6 gap-3">
        <input
          type="text"
          placeholder="Search by customer"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded p-2 w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => setPage(0)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          Search
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {data?.content.map(o => (
          <div
            key={o.id}
            className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <p className="text-gray-700 font-medium">
                <span className="text-indigo-600">{o.customerName}</span> ordered{' '}
                <strong>{o.quantity}</strong> × <em>{o.itemName}</em>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Total: ₹{o.quantity * o.price}
              </p>
            </div>
            <button
              onClick={() => deleteMutation.mutate(o.id)}
              disabled={deleteMutation.isPending}
              className="mt-3 sm:mt-0 text-red-600 hover:text-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
        >
          Prev
        </button>
        <span className="text-gray-700">
          Page {data ? data.number + 1 : 0} of {data ? data.totalPages : 0}
        </span>
        <button
          onClick={() => data && !data.last && setPage(old => old + 1)}
          disabled={data?.last}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}
