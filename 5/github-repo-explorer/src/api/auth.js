const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'Ov23liABCDEF123456789'
const GITHUB_SCOPES = 'repo read:user user:email'

export const mockUser = {
  login: 'octocat',
  id: 1,
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  name: 'The Octocat',
  company: 'GitHub',
  blog: 'https://github.com/blog',
  location: 'San Francisco, CA',
  email: 'octocat@github.com',
  bio: 'GitHub mascot',
  public_repos: 8,
  followers: 20,
  following: 0
}

export const getGitHubAuthUrl = () => {
  const state = generateRandomState()
  sessionStorage.setItem('github_oauth_state', state)

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: `${window.location.origin}/auth/callback`,
    scope: GITHUB_SCOPES,
    state: state
  })

  return `https://github.com/login/oauth/authorize?${params.toString()}`
}

export const exchangeCodeForToken = async (code) => {
  return 'mock_access_token_' + Math.random().toString(36).substring(2, 15)
}

export const getUserData = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser)
    }, 100)
  })
}

function generateRandomState() {
  return Math.random().toString(36).substring(2, 15)
}
