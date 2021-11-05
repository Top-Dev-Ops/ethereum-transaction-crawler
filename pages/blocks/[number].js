import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import {axiosMoralis} from "../../services/axios";

export default function Block() {
  const [block, setBlock] = useState({})

  const router = useRouter()
  const { number } = router.query

  useEffect(async () => {
    setBlock((await axiosMoralis.get(`/block/${number}`)).data)
  }, [])

  return (
    <div className="w-full pt-16">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-medium text-gray-900 inline-block">
            Block <span className="text-blue-700">#{number}</span>
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <table className="table-fixed w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-lg font-bold text-gray-500 tracking-wider"
              >
                Txn Hash
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg font-bold text-gray-500 tracking-wider"
              >
                Block
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg font-bold text-gray-500 tracking-wider"
              >
                From
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg font-bold text-gray-500 tracking-wider"
              >
                To
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg font-bold text-gray-500 tracking-wider"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {block.transactions !== undefined && block.transactions.map(transaction => (
              <tr key={`transaction_${transaction.hash}`}>
                <td className="px-6 py-4 w-1/5 truncate text-sm font-medium text-gray-900">
                  {transaction.hash}
                </td>
                <td className="px-6 py-4 w-1/5 truncate text-sm text-gray-500">
                  {transaction.block_number}
                </td>
                <td className="px-6 py-4 w-1/5 truncate text-sm text-gray-500">
                  {transaction.from_address}
                </td>
                <td className="px-6 py-4 w-1/5 truncate text-sm text-gray-500">
                  {transaction.to_address}
                </td>
                <td className="px-6 py-4 w-1/5 truncate text-sm text-gray-500">
                  {transaction.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
