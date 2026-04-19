import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GitCommitHorizontalIcon, StarIcon, BookMarkedIcon, HistoryIcon } from "lucide-react"

const GITHUB_USERNAME = "mohammadumar-dev"

async function getGitHubStats() {
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
  const gqlHeaders: HeadersInit = {
    ...headers,
    "Content-Type": "application/json",
  }

  const thisYear = new Date().getFullYear()

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 },
    }),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
      { headers, next: { revalidate: 3600 } }
    ),
  ])

  const user = await userRes.json()
  const repos: { stargazers_count: number; created_at: string }[] = await reposRes.json()

  const joinYear = new Date(user.created_at as string).getFullYear()
  const years = Array.from({ length: thisYear - joinYear + 1 }, (_, i) => joinYear + i)

  // Fetch contributions for each year in parallel
  const yearlyCommits = await Promise.all(
    years.map((year) =>
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: gqlHeaders,
        body: JSON.stringify({
          query: `{
            user(login: "${GITHUB_USERNAME}") {
              contributionsCollection(
                from: "${year}-01-01T00:00:00Z"
                to: "${year}-12-31T23:59:59Z"
              ) {
                contributionCalendar {
                  totalContributions
                }
              }
            }
          }`,
        }),
        next: { revalidate: 3600 },
      })
        .then((r) => r.json())
        .then(
          (d) =>
            (d?.data?.user?.contributionsCollection?.contributionCalendar
              ?.totalContributions as number) ?? 0
        )
    )
  )

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const reposThisYear = repos.filter(
    (r) => new Date(r.created_at).getFullYear() === thisYear
  ).length
  const allTimeCommits = yearlyCommits.reduce((sum, c) => sum + c, 0)
  const commitsThisYear = yearlyCommits[yearlyCommits.length - 1] ?? 0

  return {
    publicRepos: user.public_repos as number,
    followers: user.followers as number,
    totalStars,
    reposThisYear,
    allTimeCommits,
    commitsThisYear,
    joinYear,
  }
}

export async function SectionCards() {
  const stats = await getGitHubStats()
  const thisYear = new Date().getFullYear()

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Public Repositories</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.publicRepos}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <BookMarkedIcon />
              +{stats.reposThisYear} this year
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.reposThisYear} new repos in {thisYear}{" "}
            <BookMarkedIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">All public GitHub repositories</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Stars</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalStars}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <StarIcon />
              Across all repos
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Starred by the community{" "}
            <StarIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Total stars on public repositories</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>All-time Commits</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.allTimeCommits.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HistoryIcon />
              Since {stats.joinYear}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Across all years on GitHub{" "}
            <HistoryIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total commits since {stats.joinYear}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Contributions in {thisYear}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.commitsThisYear.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <GitCommitHorizontalIcon />
              This year
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Commits pushed in {thisYear}{" "}
            <GitCommitHorizontalIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            GitHub contribution activity
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
