import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  MapPin,
  Tag,
  User,
  Globe,
  Pause,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import StatCard from '../../components/common/StatCard'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend)

// Fix leaflet default icons (same approach as SalesMapping)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
})

const PromotionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [metric, setMetric] = useState('impressions')
  const [range, setRange] = useState('30d')

  // --- Sample realistic data (not placeholders) ---
  const promotion = useMemo(() => ({
    id,
    title: 'Flash Sale Boost - Urban Threads',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    owner: { name: 'Urban Threads', avatar: 'U', type: 'Shop' },
    adType: 'Shop Product',
    status: 'Running',
    budget: 1200,
    spent: 842,
    startDate: '2025-09-15',
    endDate: '2025-11-04',
    durationDays: 50,
    target: 'Females 18-35 • Nairobi • Interests: Fashion',
    objectives: 'Sales',
  }), [id])

  // Time-series (last 30 days sample)
  const timeseries = useMemo(() => {
    const days = 30
    const labels = Array.from({ length: days }).map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (days - 1 - i))
      return d.toISOString().slice(0, 10)
    })
    // synthetic but realistic numbers
    const impressions = labels.map((_, i) => Math.round(800 + 1200 * Math.sin(i / 3) + i * 50 + Math.random() * 300))
    const clicks = impressions.map(val => Math.round(val * (0.045 + Math.random() * 0.02)))
    const conversions = clicks.map(val => Math.round(val * (0.06 + Math.random() * 0.04)))
    const spend = conversions.map((c, i) => +( (c * (1.5 + Math.random() * 1.5)).toFixed(2) ))
    return { labels, impressions, clicks, conversions, spend }
  }, [])

  // Platform averages for comparison (example values — replace with real platform stats)
  const platformAvg = useMemo(() => ({
    impressions: 56381,
    clicks: 3061,
    spend: 568.36,
    ctr: 5.43 // percent
  }), [])

  const compareToPlatform = (metricKey, value) => {
    const avg = platformAvg[metricKey]
    if (avg === 0 || avg == null) return { pct: 0, better: true }
    const pct = ((value - avg) / avg) * 100
    return { pct: Math.round(pct * 10) / 10, better: pct >= 0 }
  }

  // Aggregate KPIs
  const kpis = useMemo(() => {
    const impressions = timeseries.impressions.reduce((s, v) => s + v, 0)
    const clicks = timeseries.clicks.reduce((s, v) => s + v, 0)
    const conversions = timeseries.conversions.reduce((s, v) => s + v, 0)
    const spend = timeseries.spend.reduce((s, v) => s + v, 0)
    const ctr = clicks / impressions || 0
    const cvr = conversions / clicks || 0
    const cpa = spend / Math.max(conversions, 1)
    return { impressions, clicks, conversions, spend: +spend.toFixed(2), ctr: +(ctr * 100).toFixed(2), cvr: +(cvr * 100).toFixed(2), cpa: +cpa.toFixed(2) }
  }, [timeseries])

  // Audience breakdown
  const audience = useMemo(() => ({
    age: { '18-24': 0.32, '25-34': 0.41, '35-44': 0.15, '45+': 0.12 },
    gender: { Female: 0.68, Male: 0.32 },
    regions: [
      { name: 'Nairobi', lat: -1.286389, lng: 36.817223, impressions: 28000 },
      { name: 'Mombasa', lat: -4.043477, lng: 39.668206, impressions: 6000 },
      { name: 'Kisumu', lat: -0.091702, lng: 34.767956, impressions: 4200 },
      { name: 'Nakuru', lat: -0.3031, lng: 36.0800, impressions: 2100 }
    ]
  }), [])

  // Conversions / transactions
  const transactions = useMemo(() => (
    Array.from({ length: 8 }).map((_, i) => ({
      id: `TX-${1000 + i}`,
      date: timeseries.labels[22 + (i % 8)],
      amount: +(20 + Math.round(Math.random() * 120)),
      status: i % 3 === 0 ? 'refunded' : 'completed',
      source: ['Product A', 'Product B', 'Product C'][i % 3]
    }))
  ), [timeseries.labels])

  // Smart insights (simple heuristics)
  const insights = useMemo(() => {
    const ins = []
    if (kpis.ctr > 5) ins.push({ badge: '🔥 Performing above average', text: `CTR ${kpis.ctr}% is higher than your account average.` })
    if (kpis.cvr < 2) ins.push({ badge: '⚠️ Low conversion rate', text: `Conversion rate is ${kpis.cvr}%. Consider optimizing landing page.` })
    // time-of-day quick insight: find day with max clicks
    const maxClicksIndex = timeseries.clicks.indexOf(Math.max(...timeseries.clicks))
    ins.push({ badge: '🕒 Peak time', text: `Peak clicks occurred on ${timeseries.labels[maxClicksIndex]}. Consider boosting budget during that period.` })
    return ins
  }, [kpis, timeseries])

  // Chart data for selected metric
  const chartData = useMemo(() => {
    const labels = timeseries.labels
    const datasets = []
    if (metric === 'impressions') datasets.push({ label: 'Impressions', data: timeseries.impressions, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.05)', tension: 0.3 })
    if (metric === 'clicks') datasets.push({ label: 'Clicks', data: timeseries.clicks, borderColor: '#f97316', backgroundColor: 'rgba(249,115,22,0.05)', tension: 0.3 })
    if (metric === 'conversions') datasets.push({ label: 'Conversions', data: timeseries.conversions, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.05)', tension: 0.3 })
    if (metric === 'spend') datasets.push({ label: 'Spend ($)', data: timeseries.spend, borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.05)', tension: 0.3 })
    return { labels, datasets }
  }, [timeseries, metric])

  const chartOptions = useMemo(() => ({ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, tooltip: { mode: 'index', intersect: false } }, interaction: { mode: 'nearest', intersect: false }, scales: { x: { ticks: { color: '#6b7280' } }, y: { ticks: { color: '#6b7280' }, grid: { color: '#f3f4f6' } } } }), [])

  // Comparative values used for an overall performance ranking
  const cmpI = compareToPlatform('impressions', timeseries.impressions.reduce((s,v)=>s+v,0))
  const cmpC = compareToPlatform('clicks', timeseries.clicks.reduce((s,v)=>s+v,0))
  const cmpR = compareToPlatform('ctr', kpis.ctr)
  const meanPct = Math.round(((cmpI.pct + cmpC.pct + cmpR.pct) / 3) * 10) / 10
  const rankPercent = Math.min(99, Math.max(1, Math.round(50 + meanPct)))
  const rankBetter = meanPct >= 0

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-6">
        <div className="flex items-start gap-4">
          <div className="w-28 h-28 rounded-lg overflow-hidden bg-white shadow">
            <img src={promotion.image} alt="promo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{promotion.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="text-sm text-gray-600">{promotion.adType}</div>
              <div className="px-2 py-1 bg-gray-100 text-xs rounded">{promotion.objectives}</div>
              <div className="text-sm text-gray-500">• {promotion.status}</div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="px-4 py-2 bg-gray-100 rounded flex items-center gap-2"><Pause className="w-4 h-4" /> Pause</button>
              <button className="px-4 py-2 bg-white border rounded flex items-center gap-2"><Edit className="w-4 h-4" /> Edit</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded flex items-center gap-2"><Trash2 className="w-4 h-4" /> Delete</button>
            </div>
          </div>
        </div>

        {/* Overall performance ranking vs platform (single rank widget) */}
        <div className="mb-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Overall performance</div>
              <div className="text-xs text-gray-500">Compared to other promotions on the platform</div>
            </div>

            <div className="text-right">
              <div className={`text-2xl font-bold ${rankBetter ? 'text-green-600' : 'text-red-600'}`}>{rankBetter ? `Top ${rankPercent}%` : `${rankPercent}%`}</div>
              <div className="w-48 h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className={`h-full ${rankBetter ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: `${rankPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title="Impressions" value={kpis.impressions.toLocaleString()} icon={Users} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
        <StatCard title="Clicks" value={kpis.clicks.toLocaleString()} icon={Tag} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
        <StatCard title="Conversions" value={kpis.conversions.toString()} icon={DollarSign} iconBgColor="bg-green-100" iconColor="text-green-600" />
        <StatCard title="Engagement Rate" value={`${kpis.cvr}%`} icon={Users} iconBgColor="bg-purple-100" iconColor="text-purple-600" />
        <StatCard title="CTR" value={`${kpis.ctr}%`} icon={MapPin} iconBgColor="bg-yellow-100" iconColor="text-yellow-600" />
        <StatCard title="Amount Spent" value={`$${kpis.spend.toLocaleString()}`} icon={DollarSign} iconBgColor="bg-gray-100" iconColor="text-gray-700" />
      </div>

      {/* Performance Chart & Audience */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-lg shadow h-[420px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Performance</h3>
            <div className="flex items-center gap-2">
              <select className="px-3 py-1 border rounded" value={metric} onChange={e => setMetric(e.target.value)}>
                <option value="impressions">Impressions</option>
                <option value="clicks">Clicks</option>
                <option value="conversions">Conversions</option>
                <option value="spend">Spend</option>
              </select>
              <select className="px-3 py-1 border rounded" value={range} onChange={e => setRange(e.target.value)}>
                <option value="7d">7d</option>
                <option value="30d">30d</option>
                <option value="90d">90d</option>
              </select>
            </div>
          </div>

          <div className="h-[320px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow h-[200px]">
            <h4 className="text-sm font-semibold mb-3">Audience - Age</h4>
            <div className="flex items-center gap-4">
              <div className="w-36 h-36">
                <Doughnut
                  data={{
                    labels: Object.keys(audience.age),
                    datasets: [{
                      data: Object.values(audience.age).map(v => Math.round(v * 100)),
                      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
                      borderColor: 'white',
                      borderWidth: 3
                    }]
                  }}
                  options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                />
              </div>
              <div>
                {Object.entries(audience.age).map(([k, v]) => (
                  <div key={k} className="text-sm text-gray-700"><strong>{k}</strong>: {(v * 100).toFixed(0)}%</div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow h-[200px]">
            <h4 className="text-sm font-semibold mb-3">Audience - Gender & Regions</h4>
            <div className="flex items-start gap-4">
              <div className="w-28 h-28">
                <Doughnut
                  data={{
                    labels: Object.keys(audience.gender),
                    datasets: [{
                      data: Object.values(audience.gender).map(v => Math.round(v * 100)),
                      backgroundColor: ['#10b981', '#3b82f6'],
                      borderColor: 'white',
                      borderWidth: 3
                    }]
                  }}
                  options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-700 mb-2">Top Regions</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {audience.regions.map((r) => (
                    <li key={r.name} className="flex items-center justify-between">
                      <span>{r.name}</span>
                      <span className="font-semibold">{r.impressions.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map, Conversions and Insights Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Audience Map</h3>
            <div className="w-full h-64 rounded overflow-hidden border border-gray-200">
              {/* Leaflet map showing audience regions */}
              <div id="promo-map" className="w-full h-full">
                {/* We'll render the map via a small component below */}
                <AudienceMap regions={audience.regions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Conversions</h3>
            <div className="space-y-3">
              {transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{tx.source}</div>
                    <div className="text-xs text-gray-500">{tx.date} • {tx.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${tx.amount}</div>
                    <div className={`text-xs ${tx.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>{tx.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6 h-full">
            <h3 className="text-lg font-semibold mb-4">Smart Insights</h3>
            <div className="space-y-3">
              {insights.map((ins, i) => (
                <div key={i} className="border-l-4 border-gray-200 pl-3">
                  <div className="text-sm font-semibold">{ins.badge}</div>
                  <div className="text-sm text-gray-600">{ins.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// AudienceMap component (uses react-leaflet directly)
const AudienceMap = ({ regions }) => {
  return (
    <MapContainer center={[ -1.286389, 36.817223 ]} zoom={6} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      {regions.map((r, i) => (
        <CircleMarker key={i} center={[r.lat, r.lng]} radius={6 + Math.log(r.impressions) / 2} pathOptions={{ fillColor: '#3b82f6', color: '#fff', weight: 1, fillOpacity: 0.8 }}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">{r.name}</div>
              <div className="text-gray-600">Impressions: {r.impressions.toLocaleString()}</div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

export default PromotionDetail