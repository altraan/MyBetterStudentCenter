import { PageShell } from "@/components/page-shell"

export default function FinancialAccountPage() {
  return (
    <PageShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Financial Account</h1>
        <p className="text-muted-foreground">View your balance, make payments, and access tax forms.</p>
      </div>
    </PageShell>
  )
}
