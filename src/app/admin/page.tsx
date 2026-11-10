export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-sm text-slate-500">
          Global metrics across weddings, quota allocations, and background worker queues.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <dt className="truncate text-sm font-medium text-slate-500">Active Weddings</dt>
          <dd className="mt-1 text-3xl font-semibold text-slate-900">24</dd>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <dt className="truncate text-sm font-medium text-slate-500">Total Storage Managed</dt>
          <dd className="mt-1 text-3xl font-semibold text-slate-900">412 GB</dd>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <dt className="truncate text-sm font-medium text-slate-500">DLQ Pending Events</dt>
          <dd className="mt-1 text-3xl font-semibold text-slate-900">0</dd>
        </div>
      </div>
    </div>
  );
}

