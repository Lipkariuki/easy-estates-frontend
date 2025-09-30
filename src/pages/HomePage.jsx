import React from 'react'
import { useNavigate } from 'react-router-dom'

const quickActions = [
  { label: 'Properties', path: '/properties', icon: '🏢' },
  { label: 'Tenants', path: '/tenants', icon: '👥' },
  { label: 'Maintenance', path: '/maintenance', icon: '🛠️' },
  { label: 'Payments', path: '/payments', icon: '💳' },
]

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-transparent px-4 py-4 pb-24 text-[#10312e]">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="bg-white rounded-3xl shadow-sm border border-[#dbece4] px-5 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#58a889]">Hello Phil</p>
              <h1 className="text-2xl font-semibold text-[#0f2e2d]">Portfolio snapshot</h1>
            </div>
            <button className="rounded-full bg-[#e7f4ee] px-3 py-1 text-xs font-medium text-[#158f68]">
              Help
            </button>
          </div>

          <div className="rounded-2xl bg-[#0f4d4a] text-white px-4 py-5 space-y-3">
            <p className="text-sm uppercase tracking-wide text-white/70">Total revenue</p>
            <p className="text-3xl font-bold">KES 2,480,000</p>
            <div className="flex gap-3 text-sm">
              <button className="flex-1 rounded-full bg-[#20a382] py-2 font-semibold text-white shadow-sm">
                Add Property
              </button>
              <button className="flex-1 rounded-full border border-white/30 py-2 font-semibold text-white/90">
                View Reports
              </button>
            </div>
          </div>
        </header>

        <section className="bg-white rounded-3xl shadow-sm border border-[#dbece4] px-5 py-5 space-y-4">
          <h2 className="text-base font-semibold text-[#0f2e2d]">Quick actions</h2>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 text-xs text-[#0f2e2d]/80"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7f4ee] text-lg text-[#158f68]">
                  {action.icon}
                </span>
                {action.label}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-sm border border-[#dbece4] px-5 py-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#0f2e2d]">Notifications</h2>
            <button className="text-xs font-medium text-[#158f68]">View all</button>
          </div>
          <div className="space-y-3 text-sm text-[#0f2e2d]/80">
            <div className="flex items-center justify-between rounded-2xl border border-[#e7f4ee] px-4 py-3">
              <div>
                <p className="font-medium text-[#0f2e2d]">3 tenant KYCs pending approval</p>
                <p className="text-xs text-[#58a889] mt-1">Tap to review now</p>
              </div>
              <span className="text-[#158f68] text-lg">👁️</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-[#e7f4ee] px-4 py-3">
              <div>
                <p className="font-medium text-[#0f2e2d]">Maintenance follow up</p>
                <p className="text-xs text-[#58a889] mt-1">2 pending jobs at Ruaka Heights</p>
              </div>
              <span className="text-[#158f68] text-lg">🛠️</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
