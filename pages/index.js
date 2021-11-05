import Link from "next/link"
import { useState, useEffect, useContext } from "react"

import { axiosMoralis } from "../services/axios"

import { AppContext } from "../contexts"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

  const [blocks, setBlocks] = useState([])
  const [latestBlockNumber, setLatestBlockNumber] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const { search } = useContext(AppContext)

  // fetch 10 blocks from moralis
  const fetchBlocks = (blockNumber, start = false) => {
    const _blocks = []
    const urls = []

    Array.from(Array(10), (_, id) => id).forEach(index => {
      urls.push(`/block/${blockNumber - index}`)
    })

    const getBlocks = (urls) => {
      return Promise.all(urls.map(fetchData))
    }

    const fetchData = (url) => {
      return axiosMoralis.get(url).then(res => _blocks.push(res.data))
    }

    getBlocks(urls).then(res => {
      setIsLoading(false)
      if (start) {
        setBlocks([..._blocks.sort((a, b) => b.number - a.number)])
      } else {
        setBlocks([...blocks, ..._blocks.sort((a, b) => b.number - a.number)])
      }
    })
  }

  // fetch blocks by address
  const fetchBlocksByAddress = async (address) => {
    let data
    const _blocks = []
    const _transactions = await axiosMoralis.get(`/${search}`)
    data = _transactions.data.result.reduce(function (a, b) {
      (a[b['block_number']] = a[b['block_number']] || []).push(b)
      return a
    }, {})
    Object.keys(data).forEach(number => {
      _blocks.push({ number, transaction_count: data[number].length })
    })
    setBlocks([..._blocks])
  }

  // fetch blocks & transactions by address
  useEffect(async () => {
    if (search === '') {
      const blockNumber = (await axiosMoralis.get('/dateToBlock')).data.block
      fetchBlocks(blockNumber, true)
      setLatestBlockNumber(blockNumber)
    } else {
      await fetchBlocksByAddress(search)
    }
  }, [search])

  return (
    <div className="w-full pt-16">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-medium text-gray-900">Latest Blocks</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-lg font-medium text-gray-500 tracking-wider"
              >
                Block
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg font-medium text-gray-500 tracking-wider"
              >
                Txn
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-left">
            {blocks.map(block => (
              <tr key={`block_${block.number}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`blocks/${block.number}`}>
                    <a className="text-blue-700">{block.number}</a>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {block.transaction_count} Transactions
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          className={classNames(
            isLoading ? 'cursor-not-allowed' : '',
            'inline-flex items-center mx-auto px-4 py-4 shadow-sm text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-none'
          )}
          onClick={() => {
            setIsLoading(true);
            fetchBlocks(latestBlockNumber - blocks.length)
          }}
          disabled={isLoading}
        >
          {isLoading && <svg className="animate-spin h-5 w-5 mr-3 text-blue-700" viewBox="0 0 24 24">
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>}
          Load more...
        </button>
      </div>
    </div>
  )
}
