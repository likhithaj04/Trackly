import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const STAT_CARDS = [
  { label: "Total applications", key: "applicationCount" },
  { label: "Interview",          key: "interviewCount"   },
  { label: "Interviewed",        key: "interviewedCount" },
  { label: "Assessment",         key: "assessCount"      },
  { label: "Rejected",           key: "rejectCount"      },
  { label: "Job offer",          key: "jobCount"         },
];

export default function Stats({ stats, pieData, colors }) {
  return (
    <div>
      <h2>Stats</h2>

      <div className="flex gap-7">
        {STAT_CARDS.map(({ label, key }) => (
          <div key={key}>
            <h3>{label}</h3>
            <span>{stats[key]}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}