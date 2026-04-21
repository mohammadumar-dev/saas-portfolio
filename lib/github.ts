import { unstable_cache } from "next/cache"
import { cache } from "react"
import { resolveLanguageColor } from "@/lib/language-colors"

// Read from env so the username can be overridden at deploy time
const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "mohammadumar-dev"
const REVALIDATE = 86400
const TAGS = ["github"]
const FETCH_TIMEOUT_MS = 8000

// Allowlist: only valid GitHub repo name characters
function isValidRepoName(name: string): boolean {
  return typeof name === "string" && name.length > 0 && name.length <= 100 && /^[a-zA-Z0-9._-]+$/.test(name)
}

// ── low-level helpers ──────────────────────────────────────────────────────

async function gqlFetch(query: string) {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Github-Next-Global-ID": "1",
      },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })
    if (res.status === 401) {
      console.error("[github] Authentication failed — check GITHUB_TOKEN")
      return null
    }
    if (res.status === 403) {
      console.error("[github] Forbidden — token lacks required scopes or rate limit hit")
      return null
    }
    if (res.status === 429) {
      console.error("[github] Rate limit exceeded")
      return null
    }
    if (!res.ok) {
      console.error(`[github] GraphQL request failed: ${res.status} ${res.statusText}`)
      return null
    }
    const json = await res.json()
    if (json?.errors) {
      console.error("[github] GraphQL errors:", JSON.stringify(json.errors))
    }
    return json
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      console.error(`[github] GraphQL request timed out after ${FETCH_TIMEOUT_MS}ms`)
    } else {
      console.error("[github] GraphQL fetch error:", err instanceof Error ? err.message : String(err))
    }
    return null
  }
}

async function restFetch(path: string) {
  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  if (token) headers.Authorization = `Bearer ${token}`
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })
    if (res.status === 401) { console.error("[github] REST 401 — check GITHUB_TOKEN"); return null }
    if (res.status === 403) { console.error("[github] REST 403 — rate limit or scope issue"); return null }
    if (!res.ok) { console.error(`[github] REST request failed: ${res.status} ${res.statusText}`); return null }
    return res.json()
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      console.error(`[github] REST request timed out after ${FETCH_TIMEOUT_MS}ms`)
    } else {
      console.error("[github] REST fetch error:", err instanceof Error ? err.message : String(err))
    }
    return null
  }
}

// ── cached primitives (cross-request persistent cache) ────────────────────

export const getUserCreatedAt = unstable_cache(
  async () => {
    const json = await gqlFetch(`{ user(login: "${GITHUB_USERNAME}") { createdAt } }`)
    return (json?.data?.user?.createdAt as string) ?? null
  },
  ["gh-user-created-at"],
  { revalidate: REVALIDATE, tags: TAGS }
)

export const getYearContributions = unstable_cache(
  async (year: number) => {
    const json = await gqlFetch(`{
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection(
          from: "${year}-01-01T00:00:00Z"
          to:   "${year}-12-31T23:59:59Z"
        ) { contributionCalendar { totalContributions } }
      }
    }`)
    return (json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions as number) ?? 0
  },
  ["gh-year-contributions"],
  { revalidate: REVALIDATE, tags: TAGS }
)

export const getUserProfile = unstable_cache(
  async () => restFetch(`/users/${GITHUB_USERNAME}`),
  ["gh-user-profile"],
  { revalidate: REVALIDATE, tags: TAGS }
)

export const getUserReposRest = unstable_cache(
  async () => restFetch(`/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`) as Promise<
    { stargazers_count: number; created_at: string }[] | null
  >,
  ["gh-user-repos-rest"],
  { revalidate: REVALIDATE, tags: TAGS }
)

export const getContributionCalendar = unstable_cache(
  async () => {
    const json = await gqlFetch(`{
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              firstDay
              contributionDays { date contributionCount }
            }
          }
        }
      }
    }`)
    return (json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []) as {
      firstDay: string
      contributionDays: { date: string; contributionCount: number }[]
    }[]
  },
  ["gh-contribution-calendar"],
  { revalidate: REVALIDATE, tags: TAGS }
)

export const getReposWithStats = unstable_cache(
  async () => {
    const json = await gqlFetch(`{
      user(login: "${GITHUB_USERNAME}") {
        repositories(
          first: 100
          ownerAffiliations: OWNER
          isFork: false
          isArchived: false
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          nodes {
            id name description url
            stargazerCount forkCount updatedAt
            repositoryTopics(first: 5) { nodes { topic { name } } }
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              totalSize
              edges { size node { name color } }
            }
            defaultBranchRef {
              target { ... on Commit { history { totalCount } } }
            }
          }
        }
      }
    }`)
    type RawNode = {
      id: string; name: string; description: string | null; url: string
      stargazerCount: number; forkCount: number; updatedAt: string
      repositoryTopics: { nodes: { topic: { name: string } }[] }
      languages: { totalSize: number; edges: { size: number; node: { name: string; color: string | null } }[] }
      defaultBranchRef: { target: { history: { totalCount: number } } } | null
    }
    const nodes: RawNode[] = json?.data?.user?.repositories?.nodes ?? []

    const repos = nodes.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      html_url: r.url,
      stargazers_count: r.stargazerCount,
      forks_count: r.forkCount,
      updated_at: r.updatedAt,
      topics: r.repositoryTopics.nodes.map((t) => t.topic.name),
      languages: r.languages.edges.map((e) => ({
        name: e.node.name,
        color: resolveLanguageColor(e.node.name, e.node.color),
      })),
      commit_count: r.defaultBranchRef?.target?.history?.totalCount ?? 0,
    }))

    const langMap = new Map<string, { bytes: number; color: string }>()
    for (const node of nodes) {
      for (const edge of node.languages.edges) {
        const existing = langMap.get(edge.node.name)
        if (existing) {
          existing.bytes += edge.size
        } else {
          langMap.set(edge.node.name, {
            bytes: edge.size,
            color: resolveLanguageColor(edge.node.name, edge.node.color),
          })
        }
      }
    }
    const languages = [...langMap.entries()]
      .sort((a, b) => b[1].bytes - a[1].bytes)
      .slice(0, 8)
      .map(([name, { bytes, color }]) => ({ name, bytes, color }))

    return { repos, languages }
  },
  ["gh-repos-with-stats"],
  { revalidate: REVALIDATE, tags: TAGS }
)

export const getProjectCommits = unstable_cache(
  async (repoNames: string[]) => {
    // Validate all names before building the query
    const safe = repoNames.filter(isValidRepoName)
    if (safe.length === 0) return {} as Record<string, number>

    const repoFields = safe
      .map(
        (name) =>
          // Field alias: replace hyphens with underscores (GraphQL field names can't have hyphens)
          // The repo name inside repository() is kept as-is — it's a string argument, not a GQL identifier
          `${name.replace(/-/g, "_")}: repository(name: "${name}") {
            defaultBranchRef { target { ... on Commit { history { totalCount } } } }
          }`
      )
      .join("\n")

    const json = await gqlFetch(`{ user(login: "${GITHUB_USERNAME}") { ${repoFields} } }`)
    const userNode = json?.data?.user ?? {}
    const commits: Record<string, number> = {}
    for (const name of safe) {
      commits[name] = userNode[name.replace(/-/g, "_")]?.defaultBranchRef?.target?.history?.totalCount ?? 0
    }
    return commits
  },
  ["gh-project-commits"],
  { revalidate: REVALIDATE, tags: TAGS }
)

// ── composed helpers (React.cache for per-render deduplication) ────────────

export const getAllTimeCommits = cache(async (): Promise<number | null> => {
  const createdAt = await getUserCreatedAt()
  if (!createdAt) return null
  const joinYear = new Date(createdAt).getFullYear()
  const thisYear = new Date().getFullYear()
  const years = Array.from({ length: thisYear - joinYear + 1 }, (_, i) => joinYear + i)
  const totals = await Promise.all(years.map(getYearContributions))
  return totals.reduce((sum, n) => sum + n, 0)
})

export const getGitHubKPIs = cache(async () => {
  const [profile, repos, createdAt] = await Promise.all([
    getUserProfile(),
    getUserReposRest(),
    getUserCreatedAt(),
  ])
  if (!profile || !repos || !createdAt) return null

  const thisYear = new Date().getFullYear()
  const joinYear = new Date(createdAt).getFullYear()
  const years = Array.from({ length: thisYear - joinYear + 1 }, (_, i) => joinYear + i)
  const yearlyCommits = await Promise.all(years.map(getYearContributions))

  return {
    publicRepos: profile.public_repos as number,
    followers: profile.followers as number,
    totalStars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    reposThisYear: repos.filter((r) => new Date(r.created_at).getFullYear() === thisYear).length,
    allTimeCommits: yearlyCommits.reduce((sum, c) => sum + c, 0),
    commitsThisYear: yearlyCommits[yearlyCommits.length - 1] ?? 0,
    joinYear,
  }
})

export const getDashboardData = cache(async () => {
  const [weeks, { repos, languages }] = await Promise.all([
    getContributionCalendar(),
    getReposWithStats(),
  ])

  const weekly = weeks.map((week) => ({
    date: week.firstDay,
    contributions: week.contributionDays.reduce((sum, d) => sum + d.contributionCount, 0),
  }))

  const monthly = Array(12).fill(0) as number[]
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      monthly[new Date(day.date).getMonth()] += day.contributionCount
    }
  }

  return { weekly, monthly, repos, languages }
})
