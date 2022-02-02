import Head from 'next/head'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import Login from '../components/Login'
import { Button } from '../components/Button'


export default function Component() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleSubmit = async e => {
    e.preventDefault()
    router.push('/home')
  }

  if (status === "loading") {
    return <p className="flex justify-center">Loading...</p>
  }

  return (
    <>
      <Head>
        <title>Auth app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className="px-4">
          {session
            ? (
              <>
                <h1 className="text-center text-xl font-medium py-2">Nextjs Auth starter</h1>
                <div className="flex justify-center my-5">
                  <span>
                    <small>Signed in as </small>
                    <strong>{session?.user.email || session?.user.name}</strong>
                  </span>
                </div>
                <div className="flex justify-center">
                  <Button
                    className="inline-flex justify-center w-[250px] rounded-md border border-transparent shadow-sm px-10 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 sm:text-sm"
                    action={handleSubmit}
                    content="Go to the Dashboard"
                  />
                </div>
              </>
            ) : (
              <Login
                content="Sign in"
                action={() => signIn('github')}
                description={
                  <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                      Sign in with Github
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                      Or
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                        start your 14-day free trial
                      </a>
                    </p>
                  </div>
                }
              />
            )
          }
        </main>
      </div>
    </>
  )
}
