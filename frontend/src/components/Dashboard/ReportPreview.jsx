// ReportPreview.jsx — static summary derived from stats, no API call
import { useNavigate } from 'react-router-dom'

export default function ReportPreview({ stats }) {
  const navigate = useNavigate()
  const rate = stats.applicationCount
    ? Math.round((stats.interviewCount / stats.applicationCount) * 100)
    : 0

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Report preview</p>
      <div className="space-y-3 text-sm text-slate-600">
        <p><span className="font-medium text-slate-900">{stats.applicationCount} applications</span> tracked total</p>
        <p><span className="font-medium text-slate-900">{stats.interviewCount} interviews</span> — {rate}% conversion</p>
        <p><span className="font-medium text-slate-900">{stats.jobCount} offers</span> received</p>
        {stats.assessCount > 0 && <p><span className="font-medium text-slate-900">{stats.assessCount} assessments</span> in progress</p>}
      </div>
      <button
        onClick={() => navigate('/app/report')}
        className="mt-4 w-full text-xs border border-slate-200 rounded-lg py-2 text-slate-500 hover:bg-slate-50 transition-colors"
      >
        View full AI report →
      </button>
    </div>
  )
}