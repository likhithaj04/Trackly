import { useEffect,useMemo, useState } from 'react'
import Stats from './Stats'
import api from '../../utils/api'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useJobs } from "../Auth/JobContext";


export default function Dashboard() {
    const { jobs, loading } = useJobs();

       const stats = useMemo(() => ({
    applicationCount: jobs.length,
    interviewCount:   jobs.filter(j => j.status === 'interview').length,
    interviewedCount: jobs.filter(j => j.status === 'interviewd').length,
    assessCount:      jobs.filter(j => j.status === 'assessment').length,
    rejectCount:      jobs.filter(j => j.status === 'rejected').length,
    jobCount:         jobs.filter(j => j.status === 'joboffer').length,
  }), [jobs]);

  const pieData = useMemo(() => [
    { name: "Interview",   value: stats.interviewCount   },
    { name: "Interviewed", value: stats.interviewedCount },
    { name: "Assessment",  value: stats.assessCount      },
    { name: "Job offer",   value: stats.jobCount         },
    { name: "Rejected",    value: stats.rejectCount      },
  ].filter(d => d.value > 0), [stats]);

const colors=["#106A52","#A7C1DC","#868CFD","#FFADC6","#df0901"]

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard
      </h1>
      <Stats stats={stats} pieData={pieData} colors={colors}/>
    </div>
  )
}
