import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { Button } from '../../components/Button'

export default function Profile() {
  const router = useRouter()
  const { status } = useSession()

  if (status === "loading") {
    return <p className="flex justify-center">Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p className="flex justify-center">Access Denied</p>
  }

  return (
    <>
      <div className="text-center lg:text-xl p-20">
        <h1 className="text-xl mb-5">Profile Tag</h1>
        <div className="flex justify-center">
          <Button
            className="inline-flex justify-center w-[250px] rounded-md border border-transparent shadow-sm px-10 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 sm:text-sm"
            action={() => router.back()}
            content="Back"
          />
        </div>
      </div>
    </>
  )
}