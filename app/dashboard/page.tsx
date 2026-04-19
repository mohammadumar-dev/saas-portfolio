import { resolveLanguageColor } from "@/lib/language-colors"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartPieLegend } from "@/components/chart-pie-legend"
import { ChartRadarGridCustom } from "@/components/chart-radar-grid-custom"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

const GITHUB_USERNAME = "mohammadumar-dev"

async function getContributionData() {
  const token = process.env.GITHUB_TOKEN
  if (!token) return { weekly: [], monthly: Array(12).fill(0) as number[] }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              weeks {
                firstDay
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }`,
    }),
    next: { revalidate: 3600 },
  })

  const json = await res.json()
  const weeks: {
    firstDay: string
    contributionDays: { date: string; contributionCount: number }[]
  }[] =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []

  const weekly = weeks.map((week) => ({
    date: week.firstDay,
    contributions: week.contributionDays.reduce(
      (sum, day) => sum + day.contributionCount,
      0
    ),
  }))

  const monthly = Array(12).fill(0) as number[]
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      const month = new Date(day.date).getMonth()
      monthly[month] += day.contributionCount
    }
  }

  return { weekly, monthly }
}

async function getRepos() {
  const token = process.env.GITHUB_TOKEN
  if (!token) return { repos: [], languages: [] }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        user(login: "${GITHUB_USERNAME}") {
          repositories(
            first: 100
            ownerAffiliations: OWNER
            isFork: false
            isArchived: false
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            nodes {
              id
              name
              description
              url
              stargazerCount
              forkCount
              updatedAt
              repositoryTopics(first: 5) {
                nodes { topic { name } }
              }
              languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                totalSize
                edges {
                  size
                  node { name color }
                }
              }
              defaultBranchRef {
                target {
                  ... on Commit {
                    history { totalCount }
                  }
                }
              }
            }
          }
        }
      }`,
    }),
    next: { revalidate: 3600 },
  })

  const json = await res.json()
  const nodes: {
    id: string
    name: string
    description: string | null
    url: string
    stargazerCount: number
    forkCount: number
    updatedAt: string
    repositoryTopics: { nodes: { topic: { name: string } }[] }
    languages: {
      totalSize: number
      edges: { size: number; node: { name: string; color: string | null } }[]
    }
    defaultBranchRef: { target: { history: { totalCount: number } } } | null
  }[] = json?.data?.user?.repositories?.nodes ?? []

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

  // Aggregate language bytes across all repos
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
}

export default async function Page() {
  const [{ weekly, monthly }, { repos, languages }] = await Promise.all([
    getContributionData(),
    getRepos(),
  ])

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive data={weekly} />
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2">
        <ChartPieLegend data={languages} />
        <ChartRadarGridCustom monthly={monthly} />
      </div>
      <DataTable data={repos} />
    </div>
  )
}
