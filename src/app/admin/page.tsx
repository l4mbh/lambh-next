export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Welcome to the Next_Lambh.io.vn Admin Dashboard.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Placeholder metric cards */}
                <div className="rounded-xl border border-border bg-card text-card-foreground shadow p-6">
                    <h3 className="tracking-tight text-sm font-medium">Total Views</h3>
                    <div className="text-2xl font-bold mt-2">1,234</div>
                    <p className="text-xs text-muted-foreground mt-1">+20% from last month</p>
                </div>
            </div>
        </div>
    )
}
