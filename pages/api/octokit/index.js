import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/core'
import { throttling } from '@octokit/plugin-throttling'

const GITHUB_APP_ID = process.env.GITHUB_APP_ID
const GITHUB_APP_PRIVATE_KEY = process.env.GITHUB_APP_PRIVATE_KEY
const GITHUB_APP_SECRET = process.env.GITHUB_APP_SECRET

const MyOctokit = Octokit.plugin(throttling)

const getOctokit = ({ installationId }) => {
  try {
    return new MyOctokit({
      authStrategy: createAppAuth,
      auth: {
        appId: GITHUB_APP_ID,
        privateKey: GITHUB_APP_PRIVATE_KEY,
        clientId: GITHUB_APP_ID,
        clientSecret: GITHUB_APP_SECRET,
        installationId
      },
      throttle: {
        onRateLimit: (retryAfter, options) => {
          console.error(
            `Request quota exhausted for request ${options.method} ${options.url}`
          );

          if (options.request.retryCount === 0) {
            // only retries once
            console.log(`Retrying after ${retryAfter} seconds!`);

            return true;
          }
        },
        onAbuseLimit: (retryAfter, options) => {
          // does not retry, only logs a warning
          console.error(
            `Abuse detected for request ${options.method} ${options.url}`
          );
        }
      }
    })
  } catch (error) {
    console.log(`Error Octokit getOctokit(): ${error}`);
  }
}

export default async function (req, res) {
  const { method, body } = req

  if (method === 'POST') {
    try {
      if(!body){
        return res.status(422).send({error: ['Missing one or more fields']})
      }

      const { installationId, owner, repo} = body
      
      // access only the repositories on which the application has been installed
      const octokit = getOctokit({ installationId })
      const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner,
        repo,
      })

      return res.status(200).json({ status: "success", data })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  } else {
    return res.status(400).json({ message: "Method not valided" })
  }

}