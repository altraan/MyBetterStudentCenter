import { PageShell } from "@/components/page-shell"

export default function TasksPage() {
  return (
    <PageShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tasks & Holds</h1>
        <p className="text-muted-foreground">View your pending tasks, to-do items, and any holds on your account.</p>
      </div>
    </PageShell>
  )
}
