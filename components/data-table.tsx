"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table"
import {
  ArrowUpDownIcon,
  ExternalLinkIcon,
  GitCommitHorizontalIcon,
  GitForkIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  SearchIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Repo = {
  id: string
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
  languages: { name: string; color: string }[]
  commit_count: number
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

const columns: ColumnDef<Repo>[] = [
  {
    accessorKey: "name",
    header: "Repository",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 min-w-0">
        <a
          href={row.original.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-medium text-foreground hover:underline w-fit"
        >
          {row.original.name}
          <ExternalLinkIcon className="size-3 text-muted-foreground shrink-0" />
        </a>
        {row.original.description && (
          <Tooltip>
            <TooltipTrigger
              render={
                <span className="text-xs text-muted-foreground line-clamp-1 cursor-default max-w-xs block" />
              }
            >
              {row.original.description}
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-72 text-xs">
              {row.original.description}
            </TooltipContent>
          </Tooltip>
        )}
        {row.original.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {row.original.topics.slice(0, 3).map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                className="px-1.5 py-0 text-xs font-normal"
              >
                {topic}
              </Badge>
            ))}
            {row.original.topics.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{row.original.topics.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "languages",
    header: "Languages",
    cell: ({ row }) => {
      const langs = row.original.languages
      if (!langs.length)
        return <span className="text-muted-foreground text-sm">—</span>
      return (
        <div className="flex flex-wrap gap-1.5">
          {langs.map((lang) => (
            <div key={lang.name} className="flex items-center gap-1">
              <span
                className="size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-xs">{lang.name}</span>
            </div>
          ))}
        </div>
      )
    },
    filterFn: (row, _, filterValue) =>
      !filterValue ||
      row.original.languages.some((l) => l.name === filterValue),
    enableSorting: false,
  },
  {
    accessorKey: "commit_count",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <GitCommitHorizontalIcon className="size-3.5" />
        Commits
        <ArrowUpDownIcon className="size-3.5 ml-1" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1 pl-3 text-sm">
        <GitCommitHorizontalIcon className="size-3.5 text-muted-foreground" />
        {row.original.commit_count.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "stargazers_count",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <StarIcon className="size-3.5" />
        Stars
        <ArrowUpDownIcon className="size-3.5 ml-1" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1 pl-3 text-sm">
        <StarIcon className="size-3.5 text-muted-foreground" />
        {row.original.stargazers_count.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "forks_count",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <GitForkIcon className="size-3.5" />
        Forks
        <ArrowUpDownIcon className="size-3.5 ml-1" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1 pl-3 text-sm">
        <GitForkIcon className="size-3.5 text-muted-foreground" />
        {row.original.forks_count.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Updated
        <ArrowUpDownIcon className="size-3.5 ml-1" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground pl-3">
        {timeAgo(row.original.updated_at)}
      </span>
    ),
  },
]

export function DataTable({ data }: { data: Repo[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "updated_at", desc: true },
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })

  const languages = React.useMemo(
    () =>
      [...new Set(data.flatMap((r) => r.languages.map((l) => l.name)))].sort(),
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const selectedLanguage =
    (columnFilters.find((f) => f.id === "languages")?.value as string) ?? ""

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-medium">
          Repositories{" "}
          <span className="text-muted-foreground font-normal text-sm">
            ({table.getFilteredRowModel().rows.length})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search repos..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 h-8 w-full sm:w-44 text-sm"
            />
          </div>
          <Select
            value={selectedLanguage || "all"}
            onValueChange={(v) =>
              setColumnFilters(
                v === "all"
                  ? columnFilters.filter((f) => f.id !== "languages")
                  : [
                      ...columnFilters.filter((f) => f.id !== "languages"),
                      { id: "languages", value: v },
                    ]
              )
            }
          >
            <SelectTrigger size="sm" className="w-32 sm:w-36">
              <SelectValue placeholder="All languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All languages</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table className="min-w-[640px]">
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No repositories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm text-muted-foreground">
            Rows per page
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger size="sm" className="w-16" id="rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                {[10, 20, 30].map((n) => (
                  <SelectItem key={n} value={`${n}`}>{n}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
