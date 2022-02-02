This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Clone code:  
```bash
git clone https://github.com/BLOCKCHAINDEVWEB/nextjs-auth2.git
cd nextjs-auth2
```

Duplicate the .env file given as an example:  
```bash
cp .env.sample .env
```

## Create you OAuth Apps in Github
1. Open your Github settings and click Developer settings.  
2. Click OAuth Apps and create your New OAuth App.  
3. Completed the following and Register application.  

sample:
  - Application name:           nextjs-oauth  
  - Homepage URL:               http://localhost:3000/home  
  - Authorization callback URL: http://localhost:3000/api/auth/callback/github  

4. Generate a new client secret and Update application.  
5. Complete your .env file with variables environnement keys of project:  
```text
AUTH_SECRET=secret
JWT_SECRET=secret
GITHUB_CLIENT_ID=1a29...bea
GITHUB_CLIENT_SECRET=17e69d3543b673d...7d
```

## Started application for development:  
execute commands:
```text
yarn or npm install
npm run dev
```

Open browser at http://localhost:3000  

# Learn More
Authorizing Github OAuth Apps
  - https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/authorizing-oauth-apps
  - https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
