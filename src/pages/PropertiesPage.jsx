import React, { useEffect, useMemo, useState } from 'react'
import axios from '../utils/axios.js'

const gradientPalette = [
  'from-[#0a2342] via-[#155e75] to-[#2c7da0]',
  'from-[#0b3c49] via-[#0f4c5c] to-[#1d6f86]',
  'from-[#134a63] via-[#1c6b8a] to-[#2093a8]',
  'from-[#0f3440] via-[#1d5f74] to-[#3ca6b6]',
]

const quickActions = [
  { label: 'Add Tenant', icon: '👤' },
  { label: 'Record Payment', icon: '💳' },
  { label: 'Capture KYC', icon: '📷' },
  { label: 'New Property', icon: '🏢' },
]

const statusBadge = {
  'in-progress': 'bg-sky-100 text-sky-700',
  attention: 'bg-amber-100 text-amber-700',
  done: 'bg-emerald-100 text-emerald-700',
}

const demoProperties = [
  {
    id: 1,
    name: 'Ruaka Heights',
    code: 'RKA-10',
    occupancy_rate: 0.92,
    units_total: 48,
    pending_kyc: 3,
    monthly_revenue: 1200000,
  },
  {
    id: 2,
    name: 'Westlands Court',
    code: 'WLC-06',
    occupancy_rate: 0.78,
    units_total: 32,
    pending_kyc: 5,
    monthly_revenue: 740000,
  },
]

const lifecycleTimeline = [
  {
    title: 'Lease activation complete',
    property: 'Ruaka Heights',
    time: 'Today • 10:15',
    status: 'in-progress',
  },
  {
    title: 'KYC review pending',
    property: 'Westlands Court',
    time: 'Yesterday • 17:20',
    status: 'attention',
  },
  {
    title: 'Maintenance approved',
    property: 'Thika Villas',
    time: 'Tue • 14:05',
    status: 'done',
  },
]

const formatCurrency = (value) => {
  if (value === undefined || value === null) return 'KES 0'
  return `KES ${Number(value).toLocaleString()}`
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState(demoProperties)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/properties?limit=20')
        if (Array.isArray(res.data.items) && res.data.items.length) {
          setProperties(res.data.items)
        }
      } catch (err) {
        console.warn('Failed to load properties', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const cards = useMemo(() => {
    if (!properties.length) return []
    return properties.map((property, index) => ({
      id: property.id,
      name: property.name,
      code: property.code,
      occupancy: property.occupancy_rate ?? 0,
      units: property.units_total ?? 0,
      pendingKyc: property.pending_kyc ?? 0,
      revenue: property.monthly_revenue ?? 0,
      gradient: gradientPalette[index % gradientPalette.length],
    }))
  }, [properties])

  return (
    <div className="min-h-screen px-4 py-4 pb-24 text-[#10312e]">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="rounded-3xl bg-white shadow-sm border border-[#dbece4] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#58a889]">Portfolio</p>
              <h1 className="text-3xl font-semibold text-[#0f2e2d]">Manage your estates</h1>
            </div>
            <div className="rounded-2xl bg-[#e7f4ee] px-6 py-3 text-center">
              <p className="text-xs uppercase tracking-widest text-[#58a889]">Monthly income</p>
              <p className="text-lg font-semibold text-[#0f2e2d]">
                {formatCurrency(cards.reduce((sum, card) => sum + card.revenue, 0))}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#58a889]">
            Keep a pulse on occupancy and onboarding. Easily add a new property or follow up pending KYC on mobile.
          </p>
        </header>

        <section className="space-y-4 bg-white rounded-3xl shadow-sm border border-[#dbece4] p-5">
          <h2 className="text-base font-semibold text-[#0f2e2d]">Quick actions</h2>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex-shrink-0 w-32 h-24 rounded-3xl bg-[#e7f4ee] border border-[#c8e6d8] flex flex-col items-center justify-center gap-2 text-sm font-medium text-[#0f2e2d]"
              >
                <span className="text-xl text-[#158f68]">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0f2e2d]">Properties</h2>
            <button className="text-xs uppercase tracking-wider text-[#158f68]">View all</button>
          </div>
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="rounded-3xl bg-[#e7f4ee] border border-[#d6eee0] h-40 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((property) => (
                <article
                  key={property.id || property.code}
                  className={`rounded-3xl p-5 text-white shadow-md bg-gradient-to-br ${property.gradient} border border-white/15 space-y-4`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/70">{property.code || 'N/A'}</p>
                      <h3 className="text-xl font-semibold leading-tight">{property.name}</h3>
                    </div>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                      {Math.round(property.occupancy * 100)}% occupied
                    </span>
                  </div>

                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <dt className="text-white/70">Units</dt>
                      <dd className="text-lg font-semibold">{property.units}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-white/70">Pending KYC</dt>
                      <dd className="text-lg font-semibold">{property.pendingKyc}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-white/70">Monthly Revenue</dt>
                      <dd className="text-lg font-semibold">{formatCurrency(property.revenue)}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-white/70">Vacant Units</dt>
                      <dd className="text-lg font-semibold">{Math.max(property.units - Math.round(property.occupancy * property.units), 0)}</dd>
                    </div>
                  </dl>

                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span>Tap to open dashboard</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">→</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl bg-white shadow-sm border border-[#dbece4] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0f2e2d]">Activity timeline</h2>
            <button className="text-xs uppercase tracking-wider text-[#158f68]">See all</button>
          </div>
          <div className="space-y-4">
            {lifecycleTimeline.map((item) => (
              <div key={item.title} className="flex items-start justify-between rounded-2xl border border-[#e7f4ee] px-4 py-3 bg-white">
                <div>
                  <p className="text-sm font-semibold text-[#0f2e2d]">{item.title}</p>
                  <p className="text-xs text-[#58a889]">{item.property}</p>
                  <p className="text-xs text-[#0f2e2d]/70 mt-1">{item.time}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${statusBadge[item.status]}`}>
                  {item.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default PropertiesPage
