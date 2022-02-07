import { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import axios from 'axios'

import Navbar from "../../components/Navbar"


export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p className="flex justify-center">Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p className="flex justify-center">Access Denied</p>
  }

  const router = useRouter()

  const [location, setLocation] = useState('')
  const [issues, setIssues] = useState([])

  const data = { installationId: '20265653', owner: 'BLOCKCHAINDEVWEB', repo: 'hardhat-erc721' }

  const handleIssues = useCallback(
    async () => {
      try {
        const { data: issues } = await axios({
          method: 'POST',
          url: '/api/octokit',
          data: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setIssues(issues.data)
      } catch(error) {
        console.error(error)
      }
    }, []
  )

  useEffect(() => {
    handleIssues()
    setLocation(router.pathname)
  }, [router])

  return (
    <>
      <Head>
        <title>Auth app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <header>
          <Navbar session={session} location={location}/>
        </header>
        <main className="text-center lg:text-xl p-20">
          <h1>Dashboard Page</h1>
          <p>
            {session 
              ? <span>
                  <small>Signed in as </small>
                  <strong>{session?.user.email || session?.user.name}</strong>
                </span>
              : <span>You need to be authentificated</span>
            }
          </p>
          <div className="p-5">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Number</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Title</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Content</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Author</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {issues.map((issue, i) => 
                  <tr key={i}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          {issue.number}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          {issue.title}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          {issue.body}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          {issue.user.login}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </main>
      </div>
    </>
  )
}