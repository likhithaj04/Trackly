// RecentJobs.jsx
const STATUS_STYLES = {
  applied:    'bg-blue-50 text-blue-800',
  interview:  'bg-amber-50 text-amber-800',
  assessment: 'bg-purple-50 text-purple-800',
  rejected:   'bg-red-50 text-red-800',
  interviewd: 'bg-teal-50 text-teal-800',
  joboffer:   'bg-green-50 text-green-800',
}

export default function RecentJobs({ jobs }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Recent applications</p>
      <div className="space-y-1">
        {jobs.map(job => (
          <div key={job._id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-500 shrink-0">
              {job.company.slice(0,2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{job.company}</p>
              <p className="text-xs text-slate-400 truncate">{job.role}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[job.status]}`}>
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}