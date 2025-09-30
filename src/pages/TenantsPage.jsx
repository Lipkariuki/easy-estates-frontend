import React from 'react'

const TenantsPage = () => (
  <div className="min-h-screen px-4 py-4 pb-24 text-[#10312e]">
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="space-y-2 bg-white rounded-3xl shadow-sm border border-[#dbece4] px-5 py-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[#58a889]">Tenant roster</p>
        <h1 className="text-3xl font-semibold text-[#0f2e2d]">Keep onboarding flowing</h1>
        <p className="text-sm text-[#58a889] max-w-xl">
          View tenant statuses, finish KYC, and prepare lease agreements without leaving your phone.
        </p>
      </header>

      <div className="rounded-3xl bg-white shadow-sm border border-[#dbece4] p-6 text-sm text-[#0f2e2d]/80">
        Tenant list coming soon. Connect to the new `/tenants` API to fetch real data.
      </div>
    </div>
  </div>
)

export default TenantsPage
