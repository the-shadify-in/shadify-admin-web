import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Shadify Admin Portal</h1>
        <p className="mt-2 text-sm text-slate-500">
          Secure internal management platform for platform operations, weddings, quotas, and DLQ recovery.
        </p>
        <div className="mt-6">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Access Admin Console &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

