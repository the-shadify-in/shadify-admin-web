export default function AdminWeddingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Weddings Directory</h1>
          <p className="text-sm text-slate-500">
            Manage provisioned weddings, entitlements, and storage quotas.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-6 py-3 font-semibold">Wedding</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Storage Quota</th>
              <th className="px-6 py-3 font-semibold">Photos</th>
              <th className="px-6 py-3 font-semibold">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-600">
            <tr>
              <td className="px-6 py-4 font-medium text-slate-900">Priya & Rohan</td>
              <td className="px-6 py-4">
                <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  Published
                </span>
              </td>
              <td className="px-6 py-4">12.4 GB / 50.0 GB</td>
              <td className="px-6 py-4">1,420</td>
              <td className="px-6 py-4">Nov 10, 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

