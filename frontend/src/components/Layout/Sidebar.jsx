import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { path: "/app/dashboard", label: "Dashboard" },
    { path: "/app/jobs", label: "Job List" },
    { path: "/app/reminder", label: "Reminder" },
    { path: "/app/report", label: "Weekly Report" },
    {path:"/app/addjob",label:"Add Job"}
    

  ];

  return (
    <div className="w-64 bg-[#202123] text-white flex flex-col p-4">

      <h2 className="text-xl font-semibold mb-8">Trackly</h2>

      <div className="flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition
              ${isActive ? "bg-[#343541]" : "hover:bg-[#2a2b32]"}`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

    </div>
  );
}