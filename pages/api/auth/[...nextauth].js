import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github';

export default (req, res) => NextAuth(req, res,
  {
    site: process.env.NEXTAUTH_URL,
    pages: {
      signIn: '/auth/signin',
      // signOut: '/auth/signout',
      error: '/auth/error', // Error code passed in query string as ?error=
    },
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      })
    ],
    secret: process.env.AUTH_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    callbacks: {
      async redirect(url, baseUrl) {
          return "/home";
      },
    },
    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60 // the session will last 30 days
    }
  }
)