import { BadgeCheck, CalendarCheck, EditIcon, Globe, Layers, Mail, MapPin, Phone, UserCog, Ban, Edit, CheckCircle, Bell, EyeOff, Eye, ThumbsUp, MessageSquare, AlertTriangle, TrendingUp, FileText, Lock, Star, Merge, Tag } from 'lucide-react'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Flags from 'country-flag-icons/react/3x2'
import { countryToFlag } from '../../utils/countryToFlag'
import StandardTable from '../../components/common/StandardTable'
import { useMessaging } from '../../contexts/MessagingContext'
import { useNotification } from '../../contexts/NotificationContext'
import { useAuth } from '../../contexts/AuthContext'
import { canUserVerify, verifyCelebrity, getVerificationDetails } from '../../services/verificationService'
import VerificationModal from '../../components/modals/VerificationModal'

// Inline SVG for East African Community flag (EAC) — simplified but visually accurate
const EacFlag = ({ className }) => (
  <svg viewBox="0 0 140 80" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="East African Community flag">
    {/* top sky blue */}
    <rect width="140" height="80" fill="#1ea7ff"/>
    {/* Middle stripes: white, black, white, green, yellow, green, red, white (stacked) */}
    <rect y="12" width="140" height="6" fill="#ffffff"/>
    <rect y="18" width="140" height="4" fill="#000000"/>
    <rect y="22" width="140" height="4" fill="#ffffff"/>
    <rect y="26" width="140" height="8" fill="#0b6623"/>
    <rect y="34" width="140" height="12" fill="#f7d618"/>
    <rect y="46" width="140" height="8" fill="#0b6623"/>
    <rect y="54" width="140" height="4" fill="#d82027"/>
    <rect y="58" width="140" height="4" fill="#ffffff"/>
    {/* bottom sky blue overlay to match proportions */}
    <rect y="62" width="140" height="18" fill="#1ea7ff"/>

    {/* central emblem (simplified): white disk, green wreath, yellow disk with map silhouette */}
    <g transform="translate(70,40)">
      <circle r="12" fill="#ffffff" />
      <circle r="10" fill="#0b6623" />
      <circle r="7" fill="#f7d618" />
      {/* small continent silhouette (very simplified) */}
      <path d="M-2,-2 L1,-2 L2,0 L1,2 L-1,1 Z" fill="#ffffff" />
    </g>
  </svg>
)

// Lightweight profile page to support both Member and Celebrity views.
// Data is mocked for now; when integrated, replace the memoized profile object
// with data loaded by id (params.id) from your backend.

const Stat = ({ label, value }) => (
  <div className="text-center">
    <div className="text-xl font-bold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
)

const SectionTitle = ({ children, action }) => (
  <div className="flex items-center justify-between mb-2">
    <h3 className="text-sm font-semibold text-gray-900">{children}</h3>
    {action}
  </div>
)

const Badge = ({ color = 'bg-gray-100 text-gray-800', children }) => (
  <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${color}`}>{children}</span>
)

const KeyValue = ({ k, v }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <span className="text-sm text-gray-600">{k}</span>
    <span className="text-sm font-medium text-gray-900">{v}</span>
  </div>
)

const ProfileDataTabs = ({ profile }) => {
  const [active, setActive] = useState('Personal')

  const tabs = ['Personal', 'Wealth', 'Career', 'Public Persona', 'Fun', 'Niche']

  // Helper renderers
  const renderPersonCard = (m) => (
    <div key={m.name} className="flex flex-col items-center text-xs w-24">
      <img src={m.imageUrl} alt={m.name} className="w-16 h-16 rounded shadow object-cover" />
      <div className="mt-2 font-medium text-sm text-center">{m.name}</div>
      <div className="text-gray-500 text-xs">{m.relation || m.type}</div>
    </div>
  )

  const renderPetCard = (p) => (
    <div key={p.name} className="flex flex-col items-center text-xs w-24">
      <img src={p.imageUrl} alt={p.name} className="w-16 h-16 rounded shadow object-cover" />
      <div className="mt-2 font-medium text-sm text-center">{p.name}</div>
      <div className="text-gray-500 text-xs">{p.type}</div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center gap-4 md:gap-6 mb-4 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`text-xs md:text-sm font-semibold whitespace-nowrap ${active === tab ? 'text-[#F19534]' : 'text-gray-700'}`}
          >
            {tab}
            {active === tab && <div className="h-0.5 bg-[#F19534] mt-2 rounded w-full" />}
          </button>
        ))}
      </div>

      <div className="h-64 overflow-y-auto pr-2 md:pr-3">
        {active === 'Personal' && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Family</h4>
            <div className="flex items-center gap-4 mb-4">
              {(profile.familyMembers||[]).map(renderPersonCard)}
            </div>

            <h4 className="text-sm font-semibold mb-2">Relationships</h4>
            <div className="flex items-center gap-4 mb-4">
              {(profile.relationships||[]).map(r => renderPersonCard({ ...r, relation: r.type }))}
            </div>

            <h4 className="text-sm font-semibold mb-2">Pets</h4>
            <div className="flex items-center gap-4 mb-4">
              {(profile.pets||[]).map(renderPetCard)}
            </div>
          </div>
        )}

        {active === 'Career' && (
          <div>
            {/* Merge education entries into career view if present */}
            {(profile.careerEntries || []).length > 0 && (
              <div className="mb-4">
                {profile.careerEntries.map((c, idx) => (
                  <div key={`${c.title || c.institution}-${idx}`} className="mb-4">
                    <div className="font-medium">{c.title ? `${c.title} — ${c.company}` : c.institution}</div>
                    {c.period && <div className="text-xs text-gray-500">{c.period}</div>}
                    {c.description && <div className="text-sm mt-1">{c.description}</div>}
                    {c.qualifications && (
                      <ul className="text-sm text-gray-600 list-disc ml-5 mt-2">
                        {c.qualifications.map((q, i) => <li key={i}>{q.title} {q.year ? `(${q.year})` : ''}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {profile.educationEntries && profile.educationEntries.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Education</h4>
                {profile.educationEntries.map((e, i) => (
                  <div key={`${e.institution || e.school}-${i}`} className="mb-3">
                    <div className="font-medium">{e.institution || e.school}</div>
                    {e.qualifications ? (
                      <ul className="text-sm text-gray-600 list-disc ml-5 mt-1">
                        {e.qualifications.map((q, idx) => <li key={idx}>{q.title} {q.year ? `(${q.year})` : ''}</li>)}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500">{e.degree} — {e.period}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {active === 'Wealth' && (
          <div>
            {/* Show Net Worth prominently */}
            {profile.netWorth && (
              <div className="mb-4">
                <div className="text-2xl font-bold text-gray-900">{profile.netWorth}</div>
                <div className="text-sm text-gray-500">Net Worth</div>
              </div>
            )}

            {profile.wealthEntries && typeof profile.wealthEntries === 'object' && !Array.isArray(profile.wealthEntries) ? (
              Object.keys(profile.wealthEntries).map(section => (
                <div key={section} className="mb-4">
                  <div className="font-medium mb-2">{section}</div>
                  <div className="flex gap-3 flex-wrap">
                    {profile.wealthEntries[section].map((w, i) => (
                      <div key={i} className="w-32 text-center">
                        <img src={w.imageUrl} className="w-28 h-20 object-cover rounded" />
                        <div className="text-sm mt-1">{w.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              (profile.wealthEntries||[]).map(w => <KeyValue key={w.title} k={w.title} v={`${w.amount} (${w.year})`} />)
            )}
          </div>
        )}

        {active === 'Public Persona' && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Hobbies & Talents</h4>
            <div className="flex gap-3 mb-4">
              {(profile.hobbies||[]).map(h => (
                <div key={h.name} className="text-sm bg-gray-100 px-3 py-1 rounded">{h.name}</div>
              ))}
            </div>

            <h4 className="text-sm font-semibold mb-2">Socials</h4>
            <div className="space-y-2">
              {(profile.socials||[]).map(s => (
                <a key={s.title} href={s.link} className="text-sm text-blue-600 block" target="_blank" rel="noreferrer">{s.title}</a>
              ))}
            </div>
          </div>
        )}

        {active === 'Fun' && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Favourite Things</h4>
            <div className="grid grid-cols-2 gap-3">
              {(profile.favouriteThings||[]).map((f, i) => (
                <div key={i} className="p-2 bg-gray-50 rounded">
                  <div className="font-medium">{f.name}</div>
                  <div className="text-xs text-gray-500">{f.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 'Niche' && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Fashion Style</h4>
            <div className="flex gap-3">
              {(profile.fashionStyle||[]).map((f, i) => (
                <div key={i} className="w-36 text-center">
                  <img src={f.imageUrl} className="w-32 h-20 object-cover rounded" />
                  <div className="text-sm mt-1 font-medium">{f.title}</div>
                  <div className="text-xs text-gray-500">{f.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Platform activity heatmap (GitHub-like contribution calendar)
const PlatformActivity = ({ initialYear = 2025, activityMap = null }) => {
  const [year, setYear] = useState(initialYear)

  // Color scale from low to high activity
  const colors = ['#ffffff', '#d1fae5', '#86efac', '#34d399', '#065f46']

  const cellSize = 12 // px
  const gap = 4 // px

  const generateWeeks = (y) => {
    const start = new Date(y, 0, 1) // January 1st of the year
    const end = new Date(y, 11, 31) // December 31st of the year

    const days = []
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d))
    }

    // Each week is a column, so we group days into weeks starting from Jan 1st
    const weeks = []
    let currentWeek = Array(7).fill(null)
    
    days.forEach((dt) => {
      const dayIndex = (dt.getDay() + 6) % 7 // Monday=0 .. Sunday=6
      
      const key = dt.toISOString().slice(0, 10)
      let value = 0
      if (activityMap && activityMap[key] !== undefined) value = activityMap[key]
      else {
        // deterministic-ish mock value: reduces need for random
        const seed = dt.getDate() + dt.getMonth() * 3 + y
        value = Math.floor(Math.abs(Math.sin(seed)) * (colors.length - 1))
      }
      
      currentWeek[dayIndex] = { date: new Date(dt), value }
      
      // When we reach Sunday (index 6) or the last day, push the week
      if (dayIndex === 6 || dt.getTime() === end.getTime()) {
        weeks.push(currentWeek)
        currentWeek = Array(7).fill(null)
      }
    })

    return weeks
  }

  const weeks = React.useMemo(() => generateWeeks(year), [year, activityMap])

  // compute month label positions (first occurrence of month in weeks)
  const monthPositions = {}
  weeks.forEach((week, wi) => {
    for (let di = 0; di < 7; di++) {
      const c = week[di]
      if (c && c.date.getDate() === 1) {
        const monthIndex = c.date.getMonth()
        if (monthPositions[monthIndex] === undefined) {
          monthPositions[monthIndex] = wi
        }
        break
      }
    }
  })

  const colorFor = (v) => colors[Math.max(0, Math.min(colors.length - 1, Math.round(v)))]

  // Generate years from 2025 onwards
  const currentYear = new Date().getFullYear()
  const startYear = 2025
  const endYear = Math.max(currentYear + 2, 2027)
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Platform Activity</h3>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="text-sm border rounded px-2 py-1"
        >
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <div className="relative">

          <div className="flex items-start gap-2 pt-2">
            {/* weekday labels (Mon..Sun) - show Mon/Wed/Fri while preserving exact row heights */}
            <div className="flex flex-col items-end mt-6" style={{ width: 48 }}>
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d, i) => (
                <div key={d} style={{ height: cellSize, marginBottom: i < 6 ? gap : 0 }} className="text-xs text-gray-600 flex items-center justify-end pr-2">
                  {(d === 'Mon' || d === 'Wed' || d === 'Fri' || d === 'Sun') ? d : ''}
                </div>
              ))}
            </div>

            <div>
              {/* month labels (positioned above grid) */}
              <div className=" gap-2 mb-2">
                <div className="flex flex-col items-start mr-3" style={{ width: 48 }} />
                <div className="flex gap-1">
                  {weeks.map((week, wi) => {
                    // Check if this week contains the 1st day of a month
                    let monthLabel = ''
                    for (let di = 0; di < 7; di++) {
                      const cell = week[di]
                      if (cell && cell.date.getDate() === 1) {
                        monthLabel = cell.date.toLocaleString(undefined, { month: 'short' })
                        break
                      }
                    }
                    return (
                      <div key={wi} style={{ width: cellSize }} className="text-xs text-gray-600">
                        {monthLabel}
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* weeks */}
              <div className="flex gap-1" style={{ lineHeight: 0 }}>
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((cell, di) => (
                      <div
                        key={di}
                        title={cell ? `${cell.date.toDateString()} — intensity ${cell.value}` : ''}
                        className="rounded-sm border"
                        style={{
                          width: cellSize,
                          height: cellSize,
                          backgroundColor: cell ? colorFor(cell.value) : '#ffffff',
                          borderColor: '#e5e7eb'
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[4], border: '1px solid #e5e7eb' }} />
          <div className="text-xs">High</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[2], border: '1px solid #e5e7eb' }} />
          <div className="text-xs">Medium</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[0], border: '1px solid #e5e7eb' }} />
          <div className="text-xs">Low / Inactive</div>
        </div>

        <div className="ml-auto text-xs text-gray-500">Color = activity intensity (hours / events)</div>
      </div>
    </div>
  )
}

// Context Menu Component
const ContextMenu = ({ isOpen, position, onClose, user, onAction }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !user) return null

  const isRestricted = user.status === 'Inactive' || user.status === 'Restricted'
  const isCelebrity = user.type === 'Celebrity'
  
  const menuItems = [
    {
      icon: UserCog,
      label: isCelebrity ? 'Change to Member' : 'Change to Celebrity',
      action: 'changeRole',
      color: 'text-blue-600'
    },
    {
      icon: Edit,
      label: 'Update User',
      action: 'update',
      color: 'text-gray-700'
    },
    ...(!isRestricted ? [{
      icon: Ban,
      label: 'Disable Account',
      action: 'disable',
      color: 'text-red-600'
    }] : [{
      icon: CheckCircle,
      label: 'Activate Account',
      action: 'activate',
      color: 'text-green-600'
    }]),
    {
      icon: Bell,
      label: 'Send Notification',
      action: 'notify',
      color: 'text-purple-600'
    }
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900">{user.name}</div>
        <div className="text-xs text-gray-500">{user.type}</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, user)
            onClose()
          }}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

// Post Context Menu Component
const PostContextMenu = ({ isOpen, position, onClose, post, onAction }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !post) return null

  const isPending = post.status === 'pending'
  const isHidden = post.status === 'hidden'
  const isLocked = post.status === 'locked'
  const isFeatured = post.featured === true
  
  const menuItems = [
    ...(isPending ? [{
      icon: ThumbsUp,
      label: 'Approve Post',
      action: 'approve',
      color: 'text-green-600'
    }] : []),
    ...(!isHidden ? [{
      icon: EyeOff,
      label: 'Hide Post',
      action: 'hide',
      color: 'text-orange-600'
    }] : [{
      icon: Eye,
      label: 'Unhide Post',
      action: 'unhide',
      color: 'text-green-600'
    }]),
    {
      icon: Edit,
      label: 'Edit/Censor',
      action: 'edit',
      color: 'text-blue-600'
    },
    {
      icon: Tag,
      label: 'Re-categorize',
      action: 'recategorize',
      color: 'text-purple-600'
    },
    {
      icon: Merge,
      label: 'Merge Post',
      action: 'merge',
      color: 'text-indigo-600'
    },
    ...(!isLocked ? [{
      icon: Lock,
      label: 'Lock Post',
      action: 'lock',
      color: 'text-red-600'
    }] : [{
      icon: CheckCircle,
      label: 'Unlock Post',
      action: 'unlock',
      color: 'text-green-600'
    }]),
    {
      icon: Star,
      label: isFeatured ? 'Unfeature Post' : 'Feature Post',
      action: 'feature',
      color: 'text-yellow-600'
    },
    {
      icon: MessageSquare,
      label: 'Message User',
      action: 'message',
      color: 'text-blue-500'
    }
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900 line-clamp-1">{post.title}</div>
        <div className="text-xs text-gray-500">
          {post.status === 'pending' && 'Pending • '}
          {post.status === 'hidden' && 'Hidden • '}
          {post.status === 'locked' && 'Locked • '}
          {post.featured && '⭐ Featured • '}
          {post.salutes?.toLocaleString()} salutes
        </div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, post)
            onClose()
          }}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

// Comment Context Menu Component
const CommentContextMenu = ({ isOpen, position, onClose, comment, onAction }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !comment) return null

  const isHidden = comment.status === 'hidden'
  const isPending = comment.status === 'pending'
  const isSpam = comment.status === 'spam'
  
  const menuItems = [
    ...(!isHidden ? [{
      icon: EyeOff,
      label: 'Hide Comment',
      action: 'hide',
      color: 'text-orange-600'
    }] : [{
      icon: Eye,
      label: 'Unhide Comment',
      action: 'unhide',
      color: 'text-green-600'
    }]),
    ...(isPending ? [{
      icon: ThumbsUp,
      label: 'Approve Comment',
      action: 'approve',
      color: 'text-green-600'
    }] : []),
    {
      icon: Edit,
      label: 'Edit Comment',
      action: 'edit',
      color: 'text-blue-600'
    },
    ...(!isSpam ? [{
      icon: AlertTriangle,
      label: 'Mark as Spam',
      action: 'spam',
      color: 'text-red-600'
    }] : []),
    {
      icon: TrendingUp,
      label: 'Change Sentiment',
      action: 'sentiment',
      color: 'text-purple-600'
    },
    {
      icon: MessageSquare,
      label: 'Send Warning',
      action: 'warning',
      color: 'text-yellow-600'
    },
    {
      icon: FileText,
      label: 'View Data',
      action: 'viewData',
      color: 'text-gray-700'
    }
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900 line-clamp-1">{comment.content}</div>
        <div className="text-xs text-gray-500">
          {comment.status === 'hidden' && 'Hidden • '}
          {comment.status === 'pending' && 'Pending • '}
          {comment.status === 'spam' && 'Spam • '}
          Sentiment: {comment.sentiment}
        </div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, comment)
            onClose()
          }}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

// Network Section (Following/Followers) with Tabs
const NetworkSection = ({ users = [], title = 'Following' }) => {
  const [activeTab, setActiveTab] = useState('Celebrities')
  const navigate = useNavigate()
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, user: null })

  // Filter users based on active tab
  const filteredUsers = users.filter(user => 
    activeTab === 'Celebrities' ? user.type === 'Celebrity' : user.type === 'Member'
  )

  const handleContextMenu = (e, user) => {
    e.preventDefault()
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      user
    })
  }

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, user: null })
  }

  const handleAction = (action, user) => {
    // Handle different actions
    switch (action) {
      case 'notify':
        openNotification({ name: profile.name, username: profile.username, email: profile.email })
        break
      case 'changeRole':
        console.log(`Changing ${user.name} to ${user.type === 'Celebrity' ? 'Member' : 'Celebrity'}`)
        alert(`Changed ${user.name} to ${user.type === 'Celebrity' ? 'Member' : 'Celebrity'}`)
        break
      case 'update':
        console.log(`Updating user: ${user.name}`)
        navigate(`/profile/${encodeURIComponent(user.name)}`, { state: { role: user.type.toLowerCase() } })
        break
      case 'disable':
        console.log(`Disabling account: ${user.name}`)
        alert(`Disabled account for ${user.name}`)
        break
      case 'activate':
        console.log(`Activating account: ${user.name}`)
        alert(`Activated account for ${user.name}`)
        break
      default:
        break
    }
  }

  return (
    <div className="bg-gray-200 rounded-lg p-4 h-[500px] md:h-[600px] flex flex-col">
      <h2 className="text-lg md:text-xl font-bold mb-4">{title}</h2>

      {/* Tabs */}
      <div className="flex items-center gap-2 md:gap-4 mb-4">
        <button
          onClick={() => setActiveTab('Celebrities')}
          className={`px-3 md:px-4 py-2 rounded text-sm md:text-base ${
            activeTab === 'Celebrities'
              ? 'bg-white text-black font-semibold'
              : 'bg-transparent text-gray-700'
          }`}
        >
          Celebrities
        </button>
        <button
          onClick={() => setActiveTab('Members')}
          className={`px-3 md:px-4 py-2 rounded text-sm md:text-base ${
            activeTab === 'Members'
              ? 'bg-white text-black font-semibold'
              : 'bg-transparent text-gray-700'
          }`}
        >
          Members
        </button>
      </div>

      {/* Table with scrollable content */}
      <div className="flex-1 overflow-hidden">
        <StandardTable
          showSearch={true}
          searchPlaceholder="Search Users..."
          showFilter={true}
          columns={[
            <div key="name-header" className="text-left">NAME</div>,
            <div key="country-header" className="text-center">COUNTRY</div>,
            <div key="followers-header" className="text-center">FOLLOWERS</div>,
            <div key="rating-header" className="text-center">RATING</div>,
            <div key="status-header" className="text-center">STATUS</div>,
            <div key="joined-header" className="text-center">JOINED DATE</div>
          ]}
          data={filteredUsers}
        renderRow={(item) => (
          <tr 
            key={item.id} 
            className="hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => navigate(`/profile/${encodeURIComponent(item.name)}`, { 
              state: { role: item.type.toLowerCase() } 
            })}
            onContextMenu={(e) => handleContextMenu(e, item)}
          >
            <td className="px-6 py-3">
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-gray-600 whitespace-nowrap">{item.posts} posts</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-3 text-center">
              <div className="flex items-center justify-center">
                {React.createElement(Flags[countryToFlag(item.country)], { 
                  className: "w-8 h-5"
                })}
              </div>
            </td>
            <td className="px-6 py-3 text-center whitespace-nowrap">{item.followers}</td>
            <td className="px-6 py-3 text-center whitespace-nowrap">{item.rating}</td>
            <td className="px-6 py-3 text-center">
              <span className={`inline-block px-2 py-1 rounded text-xs whitespace-nowrap ${
                item.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.status}
              </span>
            </td>
            <td className="px-6 py-3 text-center text-sm whitespace-nowrap">{item.joinedDate}</td>
          </tr>
        )}
        />
      </div>

      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        user={contextMenu.user}
        onAction={handleAction}
      />
    </div>
  )
}

const UserProfile = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { openMessage } = useMessaging()
  const { openNotification } = useNotification()
  const { user } = useAuth()
  const [commentContextMenu, setCommentContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, comment: null })
  const [postContextMenu, setPostContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, post: null })
  const [selectedPosts, setSelectedPosts] = useState([])
  const [bulkActionsOpen, setBulkActionsOpen] = useState(false)
  const bulkActionsRef = useRef(null)
  const [verificationStatus, setVerificationStatus] = useState(null)
  const [verificationModalOpen, setVerificationModalOpen] = useState(false)

  // Determine if this is a celebrity or member profile
  const profileRole = location.state?.role || 'member'
  const isCelebrity = profileRole.toLowerCase() === 'celebrity'

  // Get verification details for this celebrity (only if celebrity)
  const verificationDetails = useMemo(() => {
    if (!isCelebrity) return null
    return getVerificationDetails(id)
  }, [id, verificationStatus, isCelebrity])

  // Check if current user can verify (only for celebrities)
  const verificationCheck = useMemo(() => {
    if (!isCelebrity) return { canVerify: false }
    return canUserVerify(id, user)
  }, [id, user, verificationStatus, isCelebrity])

  // Handle verification action
  const handleVerification = async () => {
    try {
      const result = await verifyCelebrity(id, user)
      alert(result.message)
      setVerificationStatus(result.newStatus)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleCommentContextMenu = (e, comment) => {
    e.preventDefault()
    setCommentContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      comment
    })
  }

  const closeCommentContextMenu = () => {
    setCommentContextMenu({ isOpen: false, position: { x: 0, y: 0 }, comment: null })
  }

  const handleCommentAction = (action, comment) => {
    // Handle different comment actions
    switch (action) {
      case 'hide':
        console.log(`Hiding comment: ${comment.id}`)
        alert(`Hidden comment: "${comment.content.substring(0, 30)}..."`)
        break
      case 'unhide':
        console.log(`Unhiding comment: ${comment.id}`)
        alert(`Unhidden comment: "${comment.content.substring(0, 30)}..."`)
        break
      case 'approve':
        console.log(`Approving comment: ${comment.id}`)
        alert(`Approved comment: "${comment.content.substring(0, 30)}..."`)
        break
      case 'edit':
        console.log(`Editing comment: ${comment.id}`)
        alert(`Opening edit dialog for comment: "${comment.content.substring(0, 30)}..."`)
        break
      case 'spam':
        console.log(`Marking as spam: ${comment.id}`)
        alert(`Marked comment as spam: "${comment.content.substring(0, 30)}..."`)
        break
      case 'sentiment':
        console.log(`Changing sentiment for comment: ${comment.id}`)
        alert(`Opening sentiment selector for comment (current: ${comment.sentiment})`)
        break
      case 'warning':
        console.log(`Sending warning for comment: ${comment.id}`)
        alert(`Sending warning to user about comment: "${comment.content.substring(0, 30)}..."`)
        break
      case 'viewData':
        console.log(`Viewing data for comment: ${comment.id}`)
        alert(`Viewing detailed data for comment ID: ${comment.id}`)
        break
      default:
        break
    }
  }

  const handlePostContextMenu = (e, post) => {
    e.preventDefault()
    setPostContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      post
    })
  }

  const closePostContextMenu = () => {
    setPostContextMenu({ isOpen: false, position: { x: 0, y: 0 }, post: null })
  }

  const handlePostAction = (action, post) => {
    // Handle different post actions
    switch (action) {
      case 'message':
        openMessage({ name: profile.name, username: profile.username })
        break
      case 'approve':
        console.log(`Approving post: ${post.id}`)
        alert(`Approved post: "${post.title}"`)
        break
      case 'hide':
        console.log(`Hiding post: ${post.id}`)
        alert(`Hidden post: "${post.title}"`)
        break
      case 'unhide':
        console.log(`Unhiding post: ${post.id}`)
        alert(`Unhidden post: "${post.title}"`)
        break
      case 'edit':
        console.log(`Editing/Censoring post: ${post.id}`)
        alert(`Opening edit/censor dialog for post: "${post.title}"`)
        break
      case 'recategorize':
        console.log(`Re-categorizing post: ${post.id}`)
        alert(`Opening category selector for post: "${post.title}"\nCurrent categories: ${post.categories.join(', ')}`)
        break
      case 'merge':
        console.log(`Merging post: ${post.id}`)
        alert(`Opening merge dialog for post: "${post.title}"`)
        break
      case 'lock':
        console.log(`Locking post: ${post.id}`)
        alert(`Locked post: "${post.title}" - No further interactions allowed`)
        break
      case 'unlock':
        console.log(`Unlocking post: ${post.id}`)
        alert(`Unlocked post: "${post.title}" - Interactions enabled`)
        break
      case 'feature':
        console.log(`Featuring/Unfeaturing post: ${post.id}`)
        alert(`${post.featured ? 'Unfeatured' : 'Featured'} post: "${post.title}"`)
        break
      default:
        break
    }
  }

  // Close bulk actions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bulkActionsRef.current && !bulkActionsRef.current.contains(event.target)) {
        setBulkActionsOpen(false)
      }
    }

    if (bulkActionsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [bulkActionsOpen])

  // Post selection handlers
  const handlePostSelection = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleSelectAllPosts = (posts) => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(posts.map(p => p.id))
    }
  }

  const handleBulkAction = (action, posts) => {
    const selectedPostsData = posts.filter(p => selectedPosts.includes(p.id))
    
    switch (action) {
      case 'disable':
        console.log(`Disabling ${selectedPostsData.length} posts`)
        alert(`Disabled ${selectedPostsData.length} posts`)
        break
      case 'recategorize':
        console.log(`Re-categorizing ${selectedPostsData.length} posts`)
        alert(`Opening category selector for ${selectedPostsData.length} posts`)
        break
      case 'lock':
        console.log(`Locking ${selectedPostsData.length} posts`)
        alert(`Locked ${selectedPostsData.length} posts`)
        break
      case 'approve':
        console.log(`Approving ${selectedPostsData.length} posts`)
        alert(`Approved ${selectedPostsData.length} posts`)
        break
      default:
        break
    }
    
    // Reset selection and close menu
    setSelectedPosts([])
    setBulkActionsOpen(false)
  }

  const profile = useMemo(() => ({
    id,
    name: 'Braum Hallaberry',
    username: 'braum',
    country: 'Kenya',
    verified: true,
    status: 'Celebrity',
    followersCount: '12,087',
    followingCount: '12,087',
    revenue: '$ 12,087',
    visits: '200',
  profileVisits: '200',
  walletBalance: '$ 12,087',
  connections: '15,487',
    bio: 'A revolution to the world of music, founder of Carp Co',
    occupation: 'Music, Art, Physics',
    nationality: 'Kenyan',
  dob: '28-02-2000',
  registeredOn: '11-02-2000',
    email: 'braum.h@gmail.com',
    phone: '+254 708 045 985',
    rating: 3,
    imageUrl: null, // Add actual image URL here
    completionSteps: [
      { label: 'Signed Up', completed: true },
      { label: 'Added Profile', completed: true },
      { label: 'Added bio', completed: false },
      { label: 'Added Family', completed: false },
      { label: 'Added Image', completed: false },
      { label: 'Added Wealth', completed: false },
      { label: 'Added Career', completed: false }
    ]
  ,
    shops: [
      { name: 'Mtumba Connect', orders: 54, sales: '32,000' },
      { name: 'Vintage Finds', orders: 28, sales: '18,450' },
      { name: 'Urban Threads', orders: 12, sales: '8,200' },
      { name: 'Handmade Hub', orders: 6, sales: '4,120' }
    ]
    ,
    // additional personal / career / wealth / public persona data
    familyMembers: [
      { name: 'John Hallaberry', relation: 'Father', imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg' },
      { name: 'Mary Hallaberry', relation: 'Mother', imageUrl: 'https://randomuser.me/api/portraits/women/46.jpg' },
      { name: 'Jane Hallaberry', relation: 'Sister', imageUrl: 'https://randomuser.me/api/portraits/women/47.jpg' }
    ],
    relationships: [
      { name: 'Alice Doe', type: 'Partner', description: 'Long-term partner', imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg' },
      { name: 'Tom Smith', type: 'Manager', description: 'Manager at Carp Co', imageUrl: 'https://randomuser.me/api/portraits/men/66.jpg' }
    ],
    careerEntries: [
      { title: 'Founder', company: 'Carp Co', period: '2018 - Present', description: 'Built a music distribution startup focusing on indie artists.' },
      { title: 'Producer', company: 'Indie Label', period: '2015 - 2018', description: 'Produced multiple award-winning albums.' }
    ],
    // netWorth displayed prominently; wealthEntries grouped by category (Cars, Houses, Art Collection, etc.)
    netWorth: '$12,000,000',
    wealthEntries: {
      'Cars': [
        { imageUrl: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80', name: 'Lamborghini Aventador' },
        { imageUrl: 'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80', name: 'Ferrari 488' },
        { imageUrl: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80', name: 'Rolls Royce Phantom' }
      ],
      'Houses': [
        { imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80', name: 'Malibu Mansion' },
        { imageUrl: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80', name: 'NYC Penthouse' }
      ],
      'Art Collection': [
        { imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', name: 'Van Gogh Painting' },
        { imageUrl: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80', name: 'Picasso Sculpture' }
      ],
      'Watch Collection': [
        { imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80', name: 'Rolex Daytona' },
        { imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', name: 'Patek Philippe' }
      ]
    },
    educationEntries: [
      { school: 'Nairobi School of Music', degree: 'B.A. Music', period: '2008 - 2012' }
    ],
    hobbies: [{ name: 'Piano' }, { name: 'Sky Diving' }],
    favouriteThings: [{ name: 'Jazz', description: 'Finds inspiration in jazz' }],
    favouritePlaces: [{ name: 'Kenya', imageUrl: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=200&q=80' }],
    talents: [{ name: 'Songwriting' }],
    socials: [{ title: 'Instagram', link: 'https://instagram.com/braum' }],
    fashionStyle: [{ title: 'Bohemian Edge', description: 'Mixes boho with modern street style' }]
    ,
    pets: [
      { name: 'Buddy', type: 'Golden Retriever', imageUrl: 'https://i.ibb.co/S6wPzJc/pet1.jpg' },
      { name: 'Whiskers', type: 'Siamese Cat', imageUrl: 'https://i.ibb.co/L84k7b4/pet2.jpg' }
    ]
    ,
    posts: [
      {
        id: 'p1',
        title: "Can't believe this is how it is supposed to be",
        excerpt: "Can't believe this is how it is supposed to be and how about we just do it again and do not do....",
        thumbnail: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80',
        tagged: '10 Users',
        categories: ['Music', 'Art'],
        date: '28-02-2000',
        salutes: 32000,
        comments: 32000,
        recelebrations: 300,
        shares: 300,
        status: 'active',
        featured: true
      },
      {
        id: 'p2',
        title: 'Amazing gig last night',
        excerpt: 'An amazing experience — the crowd was electric and the sound was pristine.',
        thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
        tagged: '25 Users',
        categories: ['Music'],
        date: '01-03-2001',
        salutes: 12000,
        comments: 540,
        recelebrations: 120,
        shares: 45,
        status: 'pending',
        featured: false
      },
      {
        id: 'p3',
        title: 'Studio session highlights',
        excerpt: 'Quick highlights from today\'s studio session — sampling and new hooks.',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80',
        tagged: '5 Users',
        categories: ['Music', 'Production'],
        date: '12-06-2019',
        salutes: 4300,
        comments: 210,
        recelebrations: 34,
        shares: 12,
        status: 'hidden',
        featured: false
      },
      {
        id: 'p4',
        title: 'Throwback to my first album',
        excerpt: 'Reminiscing about creating my debut — raw, emotional and real.',
        thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        tagged: '8 Users',
        categories: ['Music', 'History'],
        date: '05-11-2010',
        salutes: 8900,
        comments: 1200,
        recelebrations: 250,
        shares: 88,
        status: 'locked',
        featured: false
      }
  ],
  comments: [
      { id: 'c1', content: `Can't believe this is how it is supposed to be and how about we just do it ...`, postTitle: `Can't believe this is how it is`, thumbnail: 'https://randomuser.me/api/portraits/men/11.jpg', salutes: 50, sentiment: 3.5, status: 'active' },
      { id: 'c2', content: `Amazing work — love the arrangement and the sound.`, postTitle: 'Amazing work', thumbnail: 'https://randomuser.me/api/portraits/women/12.jpg', salutes: 24, sentiment: 4.2, status: 'pending' },
      { id: 'c3', content: `This is so helpful, thanks for sharing!`, postTitle: 'Helpful tips', thumbnail: 'https://randomuser.me/api/portraits/men/13.jpg', salutes: 12, sentiment: 4.0, status: 'hidden' },
      { id: 'c4', content: `Not sure I agree with this take...`, postTitle: 'Hot take', thumbnail: 'https://randomuser.me/api/portraits/women/14.jpg', salutes: 3, sentiment: 2.4, status: 'spam' }
    ],
    achievements: [
      { id: 1, title: 'Make 100 comments on platform', date: '28-02-2000' },
      { id: 2, title: 'Make 100 comments on platform', date: '28-02-2000' },
      { id: 3, title: 'Make 100 comments on platform', date: '28-02-2000' },
      { id: 4, title: 'Make 100 comments on platform', date: '28-02-2000' },
      { id: 5, title: 'Make 100 comments on platform', date: '28-02-2000' },
      { id: 6, title: 'Make 100 comments on platform', date: '28-02-2000' },
      { id: 7, title: 'Make 100 comments on platform', date: '28-09-2000' }
    ],
    liveStreams: [
      { id: 1, title: 'A Day in A ...', streamedOn: '28-02-2000', views: '1000 Views', rating: '24,675', thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80', isActive: false },
      { id: 2, title: 'A Day in A ...', streamedOn: '28-02-2000', views: '1000 Views', rating: '24,675', thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80', isActive: true },
      { id: 3, title: 'A Day in A ...', streamedOn: '28-02-2000', views: '1000 Views', rating: '24,675', thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80', isActive: false },
      { id: 4, title: 'A Day in A ...', streamedOn: '28-02-2000', views: '1000 Views', rating: '24,675', thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80', isActive: false },
      { id: 5, title: 'A Day in A ...', streamedOn: '28-02-2000', views: '1000 Views', rating: '24,675', thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80', isActive: false }
    ],
    following: [
      { id: 1, name: 'Shaul Akelo', country: 'Kenya', posts: 32, followers: '32,000', rating: 4.5, type: 'Celebrity', status: 'Active', joinedDate: '15-01-2020', imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: 2, name: 'Hankue Hue', country: 'Kenya', posts: 32, followers: '23,000', rating: 4.3, type: 'Celebrity', status: 'Active', joinedDate: '22-03-2020', imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg' },
      { id: 3, name: 'Paward Chung', country: 'Kenya', posts: 32, followers: '23,000', rating: 4.3, type: 'Member', status: 'Restricted', joinedDate: '10-05-2021', imageUrl: 'https://randomuser.me/api/portraits/men/34.jpg' },
      { id: 4, name: 'Hang Turm', country: 'Kenya', posts: 32, followers: '23,000', rating: 4.3, type: 'Celebrity', status: 'Inactive', joinedDate: '05-08-2019', imageUrl: 'https://randomuser.me/api/portraits/women/35.jpg' },
      { id: 5, name: 'Hankue Hue', country: 'Kenya', posts: 32, followers: '23,000', rating: 4.3, type: 'Member', status: 'Active', joinedDate: '12-11-2021', imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg' },
      { id: 6, name: 'Hankue Hue', country: 'Kenya', posts: 32, followers: '23,000', rating: 4.3, type: 'Celebrity', status: 'Active', joinedDate: '28-02-2022', imageUrl: 'https://randomuser.me/api/portraits/women/37.jpg' }
    ],
    followers: [
      { id: 1, name: 'Maria Santos', country: 'Kenya', posts: 45, followers: '41,000', rating: 4.7, type: 'Celebrity', status: 'Active', joinedDate: '10-02-2020', imageUrl: 'https://randomuser.me/api/portraits/women/40.jpg' },
      { id: 2, name: 'John Smith', country: 'Kenya', posts: 28, followers: '19,000', rating: 4.2, type: 'Member', status: 'Active', joinedDate: '15-04-2021', imageUrl: 'https://randomuser.me/api/portraits/men/41.jpg' },
      { id: 3, name: 'Lisa Chen', country: 'Kenya', posts: 56, followers: '35,000', rating: 4.6, type: 'Celebrity', status: 'Active', joinedDate: '20-06-2020', imageUrl: 'https://randomuser.me/api/portraits/women/42.jpg' },
      { id: 4, name: 'Ahmed Ali', country: 'Kenya', posts: 33, followers: '27,000', rating: 4.4, type: 'Celebrity', status: 'Active', joinedDate: '05-09-2019', imageUrl: 'https://randomuser.me/api/portraits/men/43.jpg' },
      { id: 5, name: 'Sarah Johnson', country: 'Kenya', posts: 22, followers: '15,000', rating: 4.1, type: 'Member', status: 'Active', joinedDate: '18-12-2021', imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 6, name: 'David Kim', country: 'Kenya', posts: 38, followers: '29,000', rating: 4.5, type: 'Celebrity', status: 'Inactive', joinedDate: '12-03-2020', imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg' },
      { id: 7, name: 'Emma Wilson', country: 'Kenya', posts: 41, followers: '31,000', rating: 4.4, type: 'Member', status: 'Active', joinedDate: '25-07-2021', imageUrl: 'https://randomuser.me/api/portraits/women/46.jpg' }
    ],
    connectionsData: [
      { id: 1, name: 'Robert Taylor', country: 'Kenya', posts: 52, followers: '38,000', rating: 4.6, type: 'Celebrity', status: 'Active', joinedDate: '08-04-2020', imageUrl: 'https://randomuser.me/api/portraits/men/50.jpg' },
      { id: 2, name: 'Sophie Anderson', country: 'Kenya', posts: 34, followers: '22,000', rating: 4.3, type: 'Member', status: 'Restricted', joinedDate: '19-07-2021', imageUrl: 'https://randomuser.me/api/portraits/women/51.jpg' },
      { id: 3, name: 'Michael Brown', country: 'Kenya', posts: 47, followers: '30,000', rating: 4.5, type: 'Celebrity', status: 'Active', joinedDate: '14-11-2020', imageUrl: 'https://randomuser.me/api/portraits/men/52.jpg' },
      { id: 4, name: 'Jessica Lee', country: 'Kenya', posts: 29, followers: '18,500', rating: 4.2, type: 'Member', status: 'Active', joinedDate: '22-01-2022', imageUrl: 'https://randomuser.me/api/portraits/women/53.jpg' },
      { id: 5, name: 'Daniel Martinez', country: 'Kenya', posts: 61, followers: '44,000', rating: 4.8, type: 'Celebrity', status: 'Active', joinedDate: '03-05-2019', imageUrl: 'https://randomuser.me/api/portraits/men/54.jpg' },
      { id: 6, name: 'Emily Garcia', country: 'Kenya', posts: 25, followers: '16,000', rating: 4.0, type: 'Member', status: 'Active', joinedDate: '30-09-2021', imageUrl: 'https://randomuser.me/api/portraits/women/55.jpg' },
      { id: 7, name: 'James Wilson', country: 'Kenya', posts: 43, followers: '33,000', rating: 4.7, type: 'Celebrity', status: 'Active', joinedDate: '17-02-2020', imageUrl: 'https://randomuser.me/api/portraits/men/56.jpg' },
      { id: 8, name: 'Olivia Davis', country: 'Kenya', posts: 31, followers: '21,000', rating: 4.4, type: 'Member', status: 'Active', joinedDate: '11-06-2021', imageUrl: 'https://randomuser.me/api/portraits/women/57.jpg' },
      { id: 9, name: 'William Moore', country: 'Kenya', posts: 55, followers: '40,000', rating: 4.6, type: 'Celebrity', status: 'Inactive', joinedDate: '26-08-2019', imageUrl: 'https://randomuser.me/api/portraits/men/58.jpg' }
    ]
  }), [id])

  // Profile completion calculations
  const totalSteps = profile.completionSteps ? profile.completionSteps.length : 0
  const completedSteps = profile.completionSteps ? profile.completionSteps.filter(s => s.completed).length : 0
  const rawProgress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0
  const progressPercent = Math.max(0, Math.min(100, rawProgress))

  return (
    <div className="p-3 md:p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {/* Header with Profile Details */}
        <div className="col-span-1 md:col-span-3 order-1">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6">
              <div className="flex flex-col gap-4">

                <img
                  src={profile.imageUrl || 'https://plus.unsplash.com/premium_photo-1760269681484-978f862fbc23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870'}
                  alt={profile.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover mx-auto md:mx-0"
                />
                {/* Only show rating stars for celebrities */}
                {isCelebrity && (
                  <div className="flex item-center gap-1 px-4 py-2 bg-gray-400 rounded-full w-fit mx-auto md:mx-0">
                    {Array.from({ length: 5}).map((_, index) => {
                      return <svg
                      key={index}
                      width='20'
                      height='20'
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    })}
                  </div>
                )}

              </div>

              <div className="flex flex-col gap-2 flex-1">

                <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">{profile.name}</h1>
                      {profile.verified && (
                        <div className="flex items-center gap-2 bg-[#FFCA28] w-fit px-3 py-1 rounded-full mx-auto md:mx-0">
                          <BadgeCheck className="w-4 h-4 font-bold text-[#FB6C1E]" strokeWidth={3}/>
                          <span className="text-xs font-bold text-[#FB6C1E]">Verified</span>
                        </div>
                      )}
                      {/* Only show occupation for celebrities */}
                      {isCelebrity && profile.occupation && (
                        <div className="text-gray-600 mt-1 text-center md:text-left">{profile.occupation}</div>
                      )}

                      <div className='flex flex-row gap-2 items-center justify-center md:justify-start'>
                        {React.createElement(Flags[countryToFlag(profile.country)], {
                            className: "w-6 h-6"
                        })}
                        <div className="text-md ">{profile.country}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-between">
                      <div className="flex flex-row justify-between">
                        <h4 className='text-[20px] font-bold'>M</h4>
                        <span><EditIcon /></span>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Registered On</div>
                        <div className="font-bold text-lg md:text-[20px]">{profile.registeredOn}</div>
                      </div>
                      <div>
                      <div className="flex gap-0.3 items-center gap-3">
                          <p className='font-sm text-[12px]'>Profile Visits</p>
                          <select className="text-[12px] border-0 bg-gray-400 rounded-md">
                            <option>Today</option>
                          </select>
                        </div>
                        <h3 className="text-lg md:text-[20px] font-bold">{profile.profileVisits}</h3>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 items-center md:items-start">

                      <div className={`flex items-center gap-1 w-fit px-3 py-1 rounded-md ${isCelebrity ? 'bg-[#F19534]' : 'bg-blue-500'}`}>
                        <span className="text-[12px] font-bold uppercase text-white">{isCelebrity ? 'Celebrity' : 'Member'}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-100 w-fit px-3 py-1 rounded-full">
                        <span className="text-xs text-green-800">ACTIVE</span>
                        <div className='w-3 h-3 bg-green-600 rounded-full'></div>
                      </div>

                      {/* Verification Button - Only show for celebrities when user can verify */}
                      {isCelebrity && verificationCheck.canVerify && (
                        <button
                          onClick={() => setVerificationModalOpen(true)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-semibold rounded-md transition-colors shadow-sm"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {verificationCheck.buttonText}
                        </button>
                      )}

                      {/* Verification Progress - Only show for celebrities if verification has started */}
                      {isCelebrity && verificationDetails && verificationDetails.status !== 'pending' && (
                        <div className="bg-white border border-gray-200 rounded-md p-3 w-full max-w-xs">
                          <h4 className="text-xs font-semibold text-gray-700 mb-2">Verification Progress</h4>
                          <div className="space-y-2">
                            {verificationDetails.steps.map((step, index) => (
                              <div key={index} className="flex items-start gap-2">
                                {step.completed ? (
                                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className={`text-xs ${step.completed ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                                    {step.title}
                                  </div>
                                  {step.verifier && (
                                    <div className="text-xs text-gray-500">By {step.verifier.name}</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Status message when user can't take action */}
                          {!verificationCheck.canVerify && verificationDetails.status !== 'verified' && (
                            <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-2">
                              <p className="text-xs text-blue-700">{verificationCheck.reason}</p>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  </div>


                </div>
                <div className="mt-3 text-gray-700 text-center md:text-left text-sm md:text-base">{profile.bio}</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center justify-center md:justify-start">
                    <CalendarCheck className="mr-2 h-4 w-4 text-gray-600"/>
                    <div className="font-medium text-sm md:text-base">{profile.dob}</div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Phone className="mr-2 h-4 w-4 text-gray-600"/>
                    <div className="font-medium text-sm md:text-base">{profile.phone}</div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="mr-2 h-4 w-4 text-gray-600"/>
                    <div className="font-medium text-sm md:text-base">{profile.nationality}</div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Mail className="mr-2 h-4 w-4 text-gray-600"/>
                    <div className="font-medium text-sm md:text-base">{profile.email}</div>
                  </div>

                </div>
              </div>

            </div>

          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0">
            <div className="text-center md:text-left">
              <p className='font-sm text-[12px]'>Followers</p>
              <h3 className="text-xl md:text-[28px] font-bold">{profile.followersCount}</h3>
            </div>
            <div className="text-center md:text-left">
              <p className='font-sm text-[12px]'>Following</p>
              <h3 className="text-xl md:text-[28px] font-bold">{profile.followingCount}</h3>
            </div>
            <div className="text-center md:text-left">
              <p className='font-sm text-[12px]'>Connections</p>
              <h3 className="text-xl md:text-[28px] font-bold">{profile.connections}</h3>
            </div>
            <div className="text-center md:text-left">
              <p className='font-sm text-[12px]'>Revenue</p>
              <h3 className="text-xl md:text-[28px] font-bold">{profile.revenue}</h3>
            </div>
            <div className="text-center md:text-left">
              <p className='font-sm text-[12px]'>Wallet Balance</p>
              <h3 className="text-xl md:text-[28px] font-bold">{profile.walletBalance}</h3>
            </div>
          </div>

          {/* Progress Tracker - Only show for celebrities */}
          {isCelebrity && (
            <div className="w-full px-3 md:px-6 py-4">
              {/* Percentage text */}
              <div className="flex justify-end mt-2 text-sm font-semibold text-gray-700">
                {Math.round(progressPercent)}%
              </div>
              <div className="relative w-full overflow-x-auto md:overflow-visible pb-2">
                <div className="relative flex items-center justify-between min-w-full md:w-full" style={{ minWidth: '600px' }}>
                  {/* Line behind all steps */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -translate-y-1 md:-translate-y-2 z-0" />

                  {/* Progress line (filled portion) */}
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-green-500 rounded-full -translate-y-1 md:-translate-y-2 transition-all duration-500 z-0"
                    style={{ width: `${progressPercent}%` }}
                  />

                  {/* Step indicators */}
                  {profile.completionSteps && profile.completionSteps.map((step, index) => {
                    const isCompleted = !!step.completed
                    return (
                      <div
                        key={step.label}
                        className="relative flex-1 flex flex-col items-center gap-2 md:gap-3 text-center z-10 min-w-[80px]"
                      >
                        {/* Diamond shape (with inner circle for completed) */}
                        <div className="relative">
                          <div className={`w-7 h-7 md:w-9 md:h-9 rotate-45 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'} transition-colors translate-y-3.5 duration-300 rounded-md`}></div>
                        </div>
                        <span className="mt-3 text-[10px] md:text-xs font-medium text-gray-700 whitespace-nowrap px-1">
                          {step.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Rankings and Shops */}
        <div className="flex flex-col gap-4 col-span-1 md:col-span-1 order-2">
          {/* Rankings section - Only show for celebrities */}
          {isCelebrity && (
            <div className='bg-white rounded-lg shadow gap-2 p-4'>
              <h3 className="font-semibold text-lg">Rankings</h3>
              <div className="space-y-2">
                <div className="flex items-center mb-2">
                  <Globe className="mr-2 h-5 w-5 text-gray-600"/>
                  <div className="text-sm md:text-md text-gray-600">#1,234 Global</div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {/* Africa map image (use public asset) */}
                  <img src="/assets/Africa_Flag_Map.png" alt="Africa map" className="w-6 h-6 object-fit" />
                  <div className="text-sm md:text-md text-gray-600">#1,234 Africa</div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {/* East Africa (EAC flag) */}
                  {(() => {
                    const code = countryToFlag('East Africa')
                    return code === 'EAC' ? <EacFlag className="w-6 h-6" /> : React.createElement(Flags[code], { className: 'w-6 h-6' })
                  })()}
                  <div className="text-sm md:text-md text-gray-600">#1,234 East Africa</div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Kenya */}
                  {(() => {
                    const code = countryToFlag('Kenya')
                    return code === 'EAC' ? <EacFlag className="w-6 h-6" /> : React.createElement(Flags[code], { className: 'w-6 h-6' })
                  })()}
                  <div className="text-sm md:text-md text-gray-600">#1,234 Kenya</div>
                </div>
              </div>
            </div>
          )}
          {/* Shops Section (right column) - use project's StandardTable */}
          <div className="self-start w-full">
            <StandardTable
              title="Shops"
              showSearch={false}
              showFilter={false}
              columns={["Shop Name", "Sales Volume ($)"]}
              data={profile.shops}
              renderRow={(item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/store/${encodeURIComponent(item.name)}`)}
                >
                  <td className="px-4 md:px-6 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-start gap-2 md:gap-3">
                        <div className="text-[12px] font-medium truncate max-w-[100px] md:max-w-[140px] whitespace-nowrap">{item.name}</div>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{item.orders} orders</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-3 text-sm text-center align-top whitespace-nowrap">{item.sales}</td>
                </tr>
              )}
            />
          </div>
        </div>

        {/* Profile Data Section */}
        <div className="w-full bg-white rounded-lg shadow p-4 md:p-6 col-span-1 md:col-span-2 order-3">
          {isCelebrity ? (
            /* Celebrity Profile Data tabs */
            <ProfileDataTabs profile={profile} />
          ) : (
            /* Member Profile - Simple Info View (Based on User model fields only) */
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-4">
                {/* Basic User Fields from Model */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* username */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Username</div>
                    <div className="text-sm font-medium text-gray-900">{profile.username || 'N/A'}</div>
                  </div>

                  {/* fullName */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Full Name</div>
                    <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                  </div>

                  {/* email */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Email</div>
                    <div className="text-sm font-medium text-gray-900">{profile.email}</div>
                  </div>

                  {/* phoneNumber */}
                  {profile.phone && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Phone</div>
                      <div className="text-sm font-medium text-gray-900">{profile.phone}</div>
                    </div>
                  )}

                  {/* country */}
                  {profile.country && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Country</div>
                      <div className="text-sm font-medium text-gray-900">{profile.country}</div>
                    </div>
                  )}

                  {/* state */}
                  {profile.state && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">State</div>
                      <div className="text-sm font-medium text-gray-900">{profile.state}</div>
                    </div>
                  )}

                  {/* city */}
                  {profile.city && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">City</div>
                      <div className="text-sm font-medium text-gray-900">{profile.city}</div>
                    </div>
                  )}

                  {/* birthDate */}
                  {profile.dob && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Date of Birth</div>
                      <div className="text-sm font-medium text-gray-900">{profile.dob}</div>
                    </div>
                  )}

                  {/* sex */}
                  {profile.sex && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Gender</div>
                      <div className="text-sm font-medium text-gray-900">{profile.sex}</div>
                    </div>
                  )}

                  {/* createdAt / registeredOn */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Member Since</div>
                    <div className="text-sm font-medium text-gray-900">{profile.registeredOn}</div>
                  </div>

                  {/* isActive status */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Account Status</div>
                    <div className="text-sm font-medium text-green-600">Active</div>
                  </div>
                </div>

                {/* bio */}
                {profile.bio && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 mb-2">Bio</div>
                    <div className="text-sm text-gray-700">{profile.bio}</div>
                  </div>
                )}

                {/* location */}
                {profile.location && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 mb-2">Location</div>
                    <div className="text-sm text-gray-700">{profile.location}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="w-full bg-white rounded-lg col-span-1 md:col-span-2 order-4">
          <StandardTable
            title="Comments"
            showSearch={true}
            showFilter={true}
            columns={["Comment","Post","Salutes","Sentiment","Status"]}
            data={profile.comments}
            renderRow={(item, idx) => (
              <tr 
                key={item.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onContextMenu={(e) => handleCommentContextMenu(e, item)}
              >
                <td className="px-4 py-3 align-top">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="text-sm text-gray-800 line-clamp-3">{item.content}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center align-top">
                  <div className="flex items-center justify-center gap-2">
                    <img src={item.thumbnail} alt={item.postTitle} className="w-12 h-12 object-cover rounded" />
                  </div>
                </td>
                <td className="px-4 py-3 text-center align-top">{item.salutes}</td>
                <td className="px-4 py-3 text-center align-top">{item.sentiment}</td>
                <td className="px-4 py-3 text-center align-top">
                  <span className={`inline-block px-2 py-1 rounded text-xs capitalize ${
                    item.status === 'active' ? 'bg-green-100 text-green-800' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    item.status === 'hidden' ? 'bg-gray-100 text-gray-800' :
                    item.status === 'spam' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            )}
          />

          <CommentContextMenu
            isOpen={commentContextMenu.isOpen}
            position={commentContextMenu.position}
            onClose={closeCommentContextMenu}
            comment={commentContextMenu.comment}
            onAction={handleCommentAction}
          />
        </div>

        {/* Posts Section */}
        <div className="w-full bg-white rounded-lg col-span-1 md:col-span-4 order-5">
          <StandardTable
            title={<div className="flex gap-5 items-center justify-between w-full">
              <div className="text-lg font-medium">Posts</div>
              <div className="relative" ref={bulkActionsRef}>
                <div 
                  className={`flex items-center gap-3 rounded p-1 transition-colors ${
                    selectedPosts.length > 0 
                      ? 'bg-[#F19534] cursor-pointer' 
                      : 'bg-gray-300 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Layers className={`w-4 h-4 ${selectedPosts.length > 0 ? 'text-white' : 'text-gray-800'}`}/>
                  <button 
                    className={`text-[12px] font-extrabold ${selectedPosts.length > 0 ? 'text-white' : 'text-gray-800'}`}
                    disabled={selectedPosts.length === 0}
                    onClick={() => selectedPosts.length > 0 && setBulkActionsOpen(!bulkActionsOpen)}
                  >
                    Bulk Actions {selectedPosts.length > 0 && `(${selectedPosts.length})`}
                  </button>
                </div>

                {/* Bulk Actions Menu */}
                {bulkActionsOpen && selectedPosts.length > 0 && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="text-sm font-semibold text-gray-900">
                        {selectedPosts.length} post{selectedPosts.length !== 1 ? 's' : ''} selected
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleBulkAction('disable', profile.posts)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                      <Ban size={16} className="text-red-600" />
                      <span className="text-sm text-red-600">Disable Posts</span>
                    </button>

                    <button
                      onClick={() => handleBulkAction('recategorize', profile.posts)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                      <Tag size={16} className="text-purple-600" />
                      <span className="text-sm text-purple-600">Re-categorize</span>
                    </button>

                    <button
                      onClick={() => handleBulkAction('lock', profile.posts)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                      <Lock size={16} className="text-orange-600" />
                      <span className="text-sm text-orange-600">Lock Posts</span>
                    </button>

                    {/* Show Approve only if all selected posts are pending */}
                    {profile.posts.filter(p => selectedPosts.includes(p.id)).every(p => p.status === 'pending') && (
                      <button
                        onClick={() => handleBulkAction('approve', profile.posts)}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                      >
                        <ThumbsUp size={16} className="text-green-600" />
                        <span className="text-sm text-green-600">Approve Posts</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div />
            </div>}
            showSearch={true}
            showFilter={true}
            columns={[
              <div key="select-all" className="flex items-center justify-center px-4 py-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 cursor-pointer" 
                  checked={selectedPosts.length === profile.posts.length && profile.posts.length > 0}
                  onChange={() => handleSelectAllPosts(profile.posts)}
                />
              </div>,
              "Contents",
              "Tagged",
              <div key="categories-header" className="text-center">Categories</div>,
              "Date Posted",
              "Salutes",
              "Comments",
              "Recelebrations",
              "Shares",
              "Status"
            ]}
            data={profile.posts}
            renderRow={(item, idx) => (
              <tr 
                key={item.id || idx} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/post/${item.id}`)}
                onContextMenu={(e) => handlePostContextMenu(e, item)}
              >
                <td className="px-4 py-4 text-center align-top" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 m-auto cursor-pointer" 
                    checked={selectedPosts.includes(item.id)}
                    onChange={() => handlePostSelection(item.id)}
                  />
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="flex items-start gap-3">
                    <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover rounded flex-shrink-0" />
                    {/* allow the text column to shrink and truncate */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 truncate">{item.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-3 truncate">{item.excerpt}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-center align-top whitespace-nowrap">{item.tagged}</td>
                <td className="px-4 py-4 text-sm text-center align-top whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    {item.categories.map((c, i) => (
                      <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">{c}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-center align-top whitespace-nowrap">{item.date}</td>
                <td className="px-4 py-4 text-sm text-center align-top whitespace-nowrap">{item.salutes.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-center align-top whitespace-nowrap">{item.comments.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-center align-top whitespace-nowrap">{item.recelebrations.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-center align-top whitespace-nowrap">{item.shares.toLocaleString()}</td>
                <td className="px-4 py-4 text-center align-top">
                  <div className="flex flex-col items-center gap-1">
                    <span className={`inline-block px-2 py-1 rounded text-xs capitalize ${
                      item.status === 'active' ? 'bg-green-100 text-green-800' :
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'hidden' ? 'bg-orange-100 text-orange-800' :
                      item.status === 'locked' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                    {item.featured && (
                      <span className="text-xs text-yellow-600 flex items-center gap-1">
                        <Star size={12} className="fill-yellow-500" />
                        Featured
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            )}
          />

          <PostContextMenu
            isOpen={postContextMenu.isOpen}
            position={postContextMenu.position}
            onClose={closePostContextMenu}
            post={postContextMenu.post}
            onAction={handlePostAction}
          />
        </div>

        <div className="col-span-1 md:col-span-3 order-6">
          {/* Platform activity section */}
          <PlatformActivity initialYear={2025} activityMap={profile.activityMap} />
           {/* Live Stream Section */}
           <div className="bg-gray-200 rounded-lg shadow p-4 mt-6">
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-lg text-black">Live Streams</h3>
               <div className="flex items-center gap-3">
                 <select className="text-sm border rounded px-3 py-1 bg-gray-400 text-black font-medium">
                   <option>January 2025</option>
                   <option>February 2025</option>
                   <option>March 2025</option>
                 </select>
                 <button className="text-sm font-medium text-black hover:underline">See More</button>
               </div>
             </div>

             {/* Stream Cards */}
             <div className="flex gap-3 overflow-x-auto">
               {(profile.liveStreams || []).map((stream) => (
                 <div 
                   key={stream.id} 
                   className="flex-shrink-0 w-40 rounded-lg overflow-hidden border-2 border-gray-300 cursor-pointer hover:shadow-lg transition-shadow"
                   style={{ backgroundColor: '#d9d9d9' }}
                   onClick={() => navigate(`/stream/${encodeURIComponent(stream.title)}`)}
                 >
                   {/* Thumbnail */}
                   <div className="w-full h-32 bg-gray-300 overflow-hidden">
                     <img 
                       src={stream.thumbnail} 
                       alt={stream.title}
                       className="w-full h-full object-cover grayscale"
                     />
                   </div>

                   {/* Stream Info */}
                   <div className="p-2">
                     <h4 className="font-semibold text-sm text-black mb-1">{stream.title}</h4>
                     <p className="text-xs text-gray-700 mb-2">
                       <span className="font-medium">Streamed On:</span>
                       <br />
                       {stream.streamedOn}
                     </p>

                     {/* Views Badge */}
                     <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded mb-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                       <span className="text-xs text-gray-800">{stream.views}</span>
                     </div>

                     {/* Rating Badge */}
                     <div className="flex items-center gap-1 bg-gray-400 px-2 py-1 rounded">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFD700">
                         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                       </svg>
                       <span className="text-xs font-medium text-gray-800">{stream.rating}</span>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* User Achievements */}
        <div className="col-span-1 md:col-span-1 order-7">
          <div className="rounded-lg shadow p-4 mt-6" style={{ backgroundColor: '#B88080' }}>
            <h3 className="font-bold text-black text-lg mb-4">Achievements</h3>
            <div className="space-y-3">
              {(profile.achievements || []).map((achievement) => (
                <div key={achievement.id} className="bg-gray-100 rounded-lg p-3 flex items-start gap-3">
                  {/* Flame Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C12 2 8 6 8 10C8 13 10 15 12 15C14 15 16 13 16 10C16 6 12 2 12 2Z" fill="#FF6B35" stroke="#FF6B35" strokeWidth="1"/>
                      <path d="M12 15C12 15 9 17 9 19C9 20.5 10.5 22 12 22C13.5 22 15 20.5 15 19C15 17 12 15 12 15Z" fill="#FFA500" stroke="#FFA500" strokeWidth="1"/>
                      <ellipse cx="12" cy="19" rx="1.5" ry="2" fill="#FFEB3B"/>
                    </svg>
                  </div>
                  
                  {/* Achievement Info */}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{achievement.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{achievement.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Following Section */}
        <div className="col-span-1 md:col-span-4 order-8">
          <NetworkSection users={profile.following} title="Following" />
        </div>

        {/* Followers Section */}
        <div className="col-span-1 md:col-span-2 order-9">
          <NetworkSection users={profile.followers} title="Followers" />
        </div>

        {/* Connections Section */}
        <div className="col-span-1 md:col-span-2 order-10">
          <NetworkSection users={profile.connectionsData} title="Connections" />
        </div>

      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        profile={profile}
        userRole={user?.role}
        verificationStatus={verificationDetails?.status || 'pending'}
        onVerify={handleVerification}
      />
    </div>
  )
}

export default UserProfile




