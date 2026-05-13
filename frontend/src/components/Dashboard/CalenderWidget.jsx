// CalendarWidget.jsx
export default function CalendarWidget({ eventDates }) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const today = now.getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = now.toLocaleString('default', { month: 'long' })

  const appliedSet   = new Set(eventDates.applied)
  const interviewSet = new Set(eventDates.interview)

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium">{monthName} {year}</p>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {['S','M','T','W','T','F','S'].map((d,i) => (
          <div key={i} className="text-xs text-slate-400 py-1">{d}</div>
        ))}
        {Array(firstDay).fill(null).map((_,i) => <div key={'e'+i}/>)}
        {Array.from({length: daysInMonth}, (_,i) => i+1).map(d => (
          <div key={d} className={`text-xs py-1 rounded-md relative
            ${d === today ? 'bg-slate-900 text-white font-medium' : 'text-slate-600'}
          `}>
            {d}
            {interviewSet.has(d) && (
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400"/>
            )}
            {appliedSet.has(d) && !interviewSet.has(d) && (
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"/>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-2">
        <span className="flex items-center gap-1 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block"/>Applied</span>
        <span className="flex items-center gap-1 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"/>Interview</span>
      </div>
    </div>
  )
}