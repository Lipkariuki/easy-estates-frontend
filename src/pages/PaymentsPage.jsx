import React from 'react'

const PaymentsPage = () => (
  <div className="min-h-screen px-4 py-4 pb-24 text-[#10312e]">
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="space-y-2 bg-white rounded-3xl shadow-sm border border-[#dbece4] px-5 py-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[#58a889]">Payments</p>
        <h1 className="text-3xl font-semibold text-[#0f2e2d]">Keep cashflow visible</h1>
        <p className="text-sm text-[#58a889] max-w-xl">
          Record rent receipts, reconcile invoices, and spot overdue accounts quickly.
        </p>
      </header>

      <div className="rounded-3xl bg-white shadow-sm border border-[#dbece4] p-6 text-sm text-[#0f2e2d]/80">
        Payments view coming soon. Hook up to `/leases` and `/leases/payments` to populate recent activity.
      </div>
    </div>
  </div>
)

export default PaymentsPage
