import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './api'

// 1) Define and infer your form schema
const schema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  itemName:     z.string().min(1, 'Item name is required'),
  quantity:     z.number().min(1, 'Quantity must be at least 1'),
  price:        z.number().min(0, 'Price must be non‑negative'),
})
type FormData = z.infer<typeof schema>

// 2) Define the shape of the backend response
type OrderResponse = {
  id: number
  customerName: string
  itemName: string
  quantity: number
  price: number
  createdAt: string
}

export default function OrderForm() {
  const qc = useQueryClient()

  // 3) Set up RHF with Zod resolver and sensible defaults
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { customerName: '', itemName: '', quantity: 1, price: 0 },
  })

  // 4) Configure the mutation using v5 object syntax
  const mutation = useMutation<OrderResponse, Error, FormData>({
    mutationFn: data =>
      api.post<OrderResponse>('/orders', data).then(res => res.data),
    onSuccess: () => {
      // 5) Invalidate the orders query so the list refreshes
      qc.invalidateQueries({ queryKey: ['orders'] })
      reset() // clear the form
    },
  })

  // 6) Submit handler
  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 bg-gray-400 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-5 text-gray-800">
        Create New Order
      </h2>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
        <div className="flex flex-col">
          <label htmlFor="customerName" className="mb-1 text-sm text-gray-700">
            Customer Name
          </label>
          <input
            id="customerName"
            {...register('customerName')}
            placeholder="Enter customer name"
            className="border rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.customerName && (
            <p className="mt-1 text-xs text-red-600">{errors.customerName.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="itemName" className="mb-1 text-sm text-gray-700">
            Item Name
          </label>
          <input
            id="itemName"
            {...register('itemName')}
            placeholder="Enter item name"
            className="border rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.itemName && (
            <p className="mt-1 text-xs text-red-600">{errors.itemName.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="mb-1 text-sm text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            {...register('quantity', { valueAsNumber: true })}
            placeholder="Enter quantity"
            min={1}
            className="border rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.quantity && (
            <p className="mt-1 text-xs text-red-600">{errors.quantity.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-1 text-sm text-gray-700">
            Price (₹)
          </label>
          <input
            id="price"
            type="number"
            {...register('price', { valueAsNumber: true })}
            placeholder="Enter price"
            min={0}
            step="0.01"
            className="border rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button & Status */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? 'Submitting…' : 'Create Order'}
      </button>

      {/* Feedback Messages */}
      {mutation.isSuccess && (
        <p className="mt-2 text-green-600">Order created successfully!</p>
      )}
      {mutation.isError && (
        <p className="mt-2 text-red-600">{mutation.error.message}</p>
      )}
    </form>
  )
}
