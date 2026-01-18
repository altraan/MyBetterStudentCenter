import { PageShell } from "@/components/page-shell"

export default function ProfilePage() {
  return (
    <PageShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Personal Profile</h1>
        <p className="text-muted-foreground">Manage your personal information, contact details, and preferences.</p>
      </div>
    </PageShell>
  )
}
