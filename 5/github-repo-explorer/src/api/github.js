const MOCK_DELAY = 300

const delay = (ms = MOCK_DELAY) => new Promise(resolve => setTimeout(resolve, ms))

const mockUser = {
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

const mockRepos = [
  {
    id: 1,
    name: 'hello-world',
    full_name: 'octocat/hello-world',
    description: 'My first repository on GitHub!',
    language: 'Python',
    stargazers_count: 1200,
    forks_count: 300,
    open_issues_count: 45,
    visibility: 'public',
    updated_at: '2024-03-15T10:30:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 2,
    name: 'github-docs',
    full_name: 'octocat/github-docs',
    description: 'GitHub Documentation',
    language: 'JavaScript',
    stargazers_count: 5600,
    forks_count: 1200,
    open_issues_count: 120,
    visibility: 'public',
    updated_at: '2024-03-14T08:20:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 3,
    name: 'private-repo',
    full_name: 'octocat/private-repo',
    description: 'A private repository for testing',
    language: 'TypeScript',
    stargazers_count: 50,
    forks_count: 10,
    open_issues_count: 5,
    visibility: 'private',
    updated_at: '2024-03-10T14:00:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 4,
    name: 'awesome-project',
    full_name: 'octocat/awesome-project',
    description: 'An awesome project with many features',
    language: 'Rust',
    stargazers_count: 8900,
    forks_count: 2100,
    open_issues_count: 200,
    visibility: 'public',
    updated_at: '2024-03-13T16:45:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 5,
    name: 'web-app',
    full_name: 'octocat/web-app',
    description: 'A modern web application',
    language: 'Vue',
    stargazers_count: 3400,
    forks_count: 800,
    open_issues_count: 85,
    visibility: 'public',
    updated_at: '2024-03-12T09:15:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 6,
    name: 'mobile-app',
    full_name: 'octocat/mobile-app',
    description: 'Cross-platform mobile application',
    language: 'Swift',
    stargazers_count: 2200,
    forks_count: 450,
    open_issues_count: 60,
    visibility: 'private',
    updated_at: '2024-03-11T11:30:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 7,
    name: 'api-service',
    full_name: 'octocat/api-service',
    description: 'RESTful API service',
    language: 'Go',
    stargazers_count: 4500,
    forks_count: 950,
    open_issues_count: 110,
    visibility: 'public',
    updated_at: '2024-03-14T13:00:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 8,
    name: 'data-analysis',
    full_name: 'octocat/data-analysis',
    description: 'Data analysis notebooks and scripts',
    language: 'Jupyter Notebook',
    stargazers_count: 1800,
    forks_count: 320,
    open_issues_count: 30,
    visibility: 'public',
    updated_at: '2024-03-09T15:20:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 9,
    name: 'machine-learning',
    full_name: 'octocat/machine-learning',
    description: 'Machine learning models and experiments',
    language: 'Python',
    stargazers_count: 6700,
    forks_count: 1500,
    open_issues_count: 180,
    visibility: 'public',
    updated_at: '2024-03-15T07:45:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 10,
    name: 'devops-tools',
    full_name: 'octocat/devops-tools',
    description: 'DevOps automation scripts',
    language: 'Shell',
    stargazers_count: 2800,
    forks_count: 600,
    open_issues_count: 55,
    visibility: 'private',
    updated_at: '2024-03-08T10:00:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 11,
    name: 'frontend-lib',
    full_name: 'octocat/frontend-lib',
    description: 'Reusable frontend components library',
    language: 'TypeScript',
    stargazers_count: 5200,
    forks_count: 1100,
    open_issues_count: 95,
    visibility: 'public',
    updated_at: '2024-03-13T12:30:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  },
  {
    id: 12,
    name: 'backend-framework',
    full_name: 'octocat/backend-framework',
    description: 'Node.js backend framework',
    language: 'JavaScript',
    stargazers_count: 7800,
    forks_count: 1800,
    open_issues_count: 220,
    visibility: 'public',
    updated_at: '2024-03-15T08:00:00Z',
    owner: { login: 'octocat', avatar_url: mockUser.avatar_url }
  }
]

const mockBranches = [
  { name: 'main', commit: { sha: 'abc123def456' } },
  { name: 'develop', commit: { sha: 'def456ghi789' } },
  { name: 'feature/new-ui', commit: { sha: 'ghi789jkl012' } },
  { name: 'bugfix/login-issue', commit: { sha: 'jkl012mno345' } },
  { name: 'release/v1.0.0', commit: { sha: 'mno345pqr678' } }
]

const generateMockCommits = (page = 1, perPage = 30) => {
  const commits = []
  const baseDate = new Date('2024-03-15T12:00:00Z')

  for (let i = 0; i < perPage; i++) {
    const commitDate = new Date(baseDate)
    commitDate.setDate(commitDate.getDate() - (page - 1) * perPage - i)

    commits.push({
      sha: `commit${(page - 1) * perPage + i + 1}`,
      commit: {
        message: `Commit message ${(page - 1) * perPage + i + 1}: Added new feature or fixed bug #${(page - 1) * perPage + i + 1}`,
        author: {
          name: 'Octocat Developer',
          email: 'octocat@github.com',
          date: commitDate.toISOString()
        },
        committer: {
          name: 'Octocat Developer',
          email: 'octocat@github.com',
          date: commitDate.toISOString()
        }
      },
      author: {
        login: 'octocat',
        avatar_url: mockUser.avatar_url,
        html_url: 'https://github.com/octocat'
      },
      html_url: `https://github.com/octocat/hello-world/commit/commit${(page - 1) * perPage + i + 1}`
    })
  }

  return commits
}

class MockGitHubApi {
  constructor() {
    this.token = null
    this.totalPages = 5
  }

  setToken(token) {
    this.token = token
  }

  clearToken() {
    this.token = null
  }

  checkToken() {
    return !!this.token
  }

  async getUser() {
    await delay()
    if (!this.token) {
      throw new Error('Unauthorized')
    }
    return { ...mockUser }
  }

  async getRepos(options = {}) {
    await delay()

    if (!this.token) {
      throw new Error('Unauthorized')
    }

    const {
      page = 1,
      per_page = 12,
      sort = 'updated',
      direction = 'desc',
      visibility = 'all',
      search = ''
    } = options

    let filteredRepos = [...mockRepos]

    if (visibility !== 'all') {
      filteredRepos = filteredRepos.filter(repo => repo.visibility === visibility)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredRepos = filteredRepos.filter(repo =>
        repo.name.toLowerCase().includes(searchLower) ||
        repo.description.toLowerCase().includes(searchLower)
      )
    }

    switch (sort) {
      case 'stars':
        filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)
        break
      case 'forks':
        filteredRepos.sort((a, b) => b.forks_count - a.forks_count)
        break
      case 'help-wanted-issues':
        filteredRepos.sort((a, b) => b.open_issues_count - a.open_issues_count)
        break
      case 'updated':
      default:
        filteredRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        break
    }

    if (direction === 'asc') {
      filteredRepos.reverse()
    }

    const total = filteredRepos.length
    const startIndex = (page - 1) * per_page
    const endIndex = startIndex + per_page
    const paginatedRepos = filteredRepos.slice(startIndex, endIndex)

    return {
      data: paginatedRepos,
      pagination: {
        total,
        page,
        per_page,
        total_pages: Math.ceil(total / per_page),
        has_next: page < Math.ceil(total / per_page),
        has_prev: page > 1,
        next: page < Math.ceil(total / per_page) ? page + 1 : null,
        prev: page > 1 ? page - 1 : null
      },
      links: {
        first: `?page=1&per_page=${per_page}`,
        last: `?page=${Math.ceil(total / per_page)}&per_page=${per_page}`,
        next: page < Math.ceil(total / per_page) ? `?page=${page + 1}&per_page=${per_page}` : null,
        prev: page > 1 ? `?page=${page - 1}&per_page=${per_page}` : null
      }
    }
  }

  async getRepoBranches(owner, repo) {
    await delay()

    if (!this.token) {
      throw new Error('Unauthorized')
    }

    return { data: [...mockBranches] }
  }

  async getCommits(owner, repo, options = {}) {
    await delay()

    if (!this.token) {
      throw new Error('Unauthorized')
    }

    const { branch = 'main', page = 1, per_page = 30 } = options

    const commits = generateMockCommits(page, per_page)

    return {
      data: commits,
      pagination: {
        total: 150,
        page,
        per_page,
        total_pages: this.totalPages,
        has_next: page < this.totalPages,
        has_prev: page > 1,
        next: page < this.totalPages ? page + 1 : null,
        prev: page > 1 ? page - 1 : null
      },
      links: {
        first: `?branch=${branch}&page=1&per_page=${per_page}`,
        last: `?branch=${branch}&page=${this.totalPages}&per_page=${per_page}`,
        next: page < this.totalPages ? `?branch=${branch}&page=${page + 1}&per_page=${per_page}` : null,
        prev: page > 1 ? `?branch=${branch}&page=${page - 1}&per_page=${per_page}` : null
      }
    }
  }
}

export const githubApi = new MockGitHubApi()
export default githubApi
