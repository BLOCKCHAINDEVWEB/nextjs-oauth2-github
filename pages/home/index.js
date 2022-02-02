import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Navbar from '../../components/Navbar'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  const [location, setLocation] = useState('')

  useEffect(() => {
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
          <h1>Home Page</h1>
          <p>
            {session 
              ? <span>
                  <small>Signed in as </small>
                  <strong>{session?.user.email || session?.user.name}</strong>
                </span>
              : <span>This page does not require authentication.</span>
            }
          </p>
        </main>
      </div>
    </>
  )
}