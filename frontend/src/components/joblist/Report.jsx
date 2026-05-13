import React, { useEffect, useState} from "react";
import api from "../../utils/api";
import {
  FaBriefcase,
  FaChartPie,
  FaClock,
  FaCalendarAlt,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";

let reportCache = null;

export default function Report() {
  const [report, setReport] = useState(reportCache);
  const [loading, setLoading] = useState(!reportCache);

 useEffect(() => {
    if (reportCache) return;

    api.get("/job/report")
      .then(res => {
        reportCache = res.data.report;
        setReport(res.data.report);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  console.log(reportCache);
  

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-slate-300 border-t-black rounded-full animate-spin"></div>

        <p className="mt-4 text-slate-500 text-lg">
          Generating Report...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Weekly Career Report
        </h1>

        <p className="text-slate-500 mt-2">
          Your weekly job tracking insights and updates.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10">
        <div className="space-y-8">
          {report ? formatReport(report) : "No Report Found"}
        </div>
      </div>
    </div>
  );
}

function formatReport(text) {
  const cleanLines = text
    .split("\n")
    .filter(
      (line) =>
        line.trim() !== "" &&
        !line.includes("====") &&
        !line.includes("----")
    );

  return cleanLines.map((line, index) => {
    // Main Title
    if (line.includes("Weekly Career Tracking Report")) {
      return (
        <h1
          key={index}
          className="text-3xl font-bold text-slate-900"
        >
           Weekly Career Tracking Report
        </h1>
      );
    }

    // Section Headings
    if (
      line.includes("Total Applications") ||
      line.includes("Status Breakdown") ||
      line.includes("Recent Activity Summary") ||
      line.includes("Upcoming Interviews") ||
      line.includes("Insights and Observations") ||
      line.includes("Suggestions for Improvement") ||
      line.includes("Motivational Closing Summary")
    ) {
      return (
        <div
          key={index}
          className="flex items-center gap-3 pt-4"
        >
          {getIcon(line)}

          <h2 className="text-2xl font-semibold text-slate-800">
            {line.replace(/\*/g, "")}
          </h2>
        </div>
      );
    }

    if (line.includes("|")) {
      const parts = line
        .split("|")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      if (
        parts.includes("Status") ||
        parts.some((p) => p.includes("---"))
      ) {
        return null;
      }

      return (
        <div
          key={index}
          className="flex items-center justify-between bg-slate-100 rounded-2xl px-5 py-4"
        >
          <p className="font-medium text-slate-700">{parts[0]}</p>

          <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
            {parts[1]}
          </span>
        </div>
      );
    }
    if (
      line.trim().startsWith("-") ||
      line.trim().startsWith("*")
    ) {
      return (
        <div
          key={index}
          className="flex gap-3 items-start"
        >
          <div className="w-2 h-2 rounded-full bg-black mt-3"></div>

          <p className="text-slate-700 leading-7">
            {line.replace(/^[-*]\s*/, "").replace(/\*/g, "")}
          </p>
        </div>
      );
    }

    return (
      <p
        key={index}
        className="text-slate-700 leading-7"
      >
        {line.replace(/\*/g, "")}
      </p>
    );
  });
}

function getIcon(title) {
  if (title.includes("Total Applications")) {
    return <FaBriefcase className="text-blue-600 text-lg" />;
  }

  if (title.includes("Status Breakdown")) {
    return <FaChartPie className="text-green-600 text-lg" />;
  }

  if (title.includes("Recent Activity")) {
    return <FaClock className="text-yellow-500 text-lg" />;
  }

  if (title.includes("Upcoming Interviews")) {
    return <FaCalendarAlt className="text-purple-600 text-lg" />;
  }

  if (title.includes("Insights")) {
    return <FaLightbulb className="text-orange-500 text-lg" />;
  }

  if (title.includes("Suggestions")) {
    return <FaRocket className="text-pink-600 text-lg" />;
  }

  return <FaBriefcase className="text-blue-600 text-lg" />;
}