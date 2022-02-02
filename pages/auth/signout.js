import { getProviders, signOut } from "next-auth/react"

export default function SignOut({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signOut(provider.id)}>
            Signout
          </button>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
