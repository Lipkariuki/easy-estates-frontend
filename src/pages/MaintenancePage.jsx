import React from 'react'

const MaintenancePage = () => (
  <div className="min-h-screen px-4 py-4 pb-24 text-[#10312e]">
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="space-y-2 bg-white rounded-3xl shadow-sm border border-[#dbece4] px-5 py-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[#58a889]">Maintenance</p>
        <h1 className="text-3xl font-semibold text-[#0f2e2d]">Stay ahead of requests</h1>
        <p className="text-sm text-[#58a889] max-w-xl">
          Assign caretakers, mark jobs complete, and keep owners in the loop.
        </p>
      </header>

      <div className="rounded-3xl bg-white shadow-sm border border-[#dbece4] p-6 text-sm text-[#0f2e2d]/80">
        Maintenance timeline coming soon. Wire this screen to `/maintenance` for live updates.
      </div>
    </div>
  </div>
)

export default MaintenancePage
