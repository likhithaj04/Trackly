import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function Reminder() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await api.get("job/alljob");

      const jobs = res.data.data;

      const today = new Date();

      const nextFiveDays = new Date();
      nextFiveDays.setDate(today.getDate() + 5);

      const upcoming = jobs.filter((job) => {
        if (!job.statusDate) return false;

        const eventDate = new Date(job.statusDate);

        return (
          eventDate >= today &&
          eventDate <= nextFiveDays &&
          ["interview", "assessment"].includes(job.status)
        );
      });

      upcoming.sort(
        (a, b) =>
          new Date(a.statusDate) - new Date(b.statusDate)
      );

      setReminders(upcoming);
    } catch (err) {
      console.log(err);
    }
  };

  const getDaysLeft = (date) => {
    const today = new Date();

    const target = new Date(date);

    const diffTime = target - today;

    return Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Upcoming Reminders
        </h1>

        {reminders.length === 0 ? (
          <p className="text-gray-500">
            No upcoming events
          </p>
        ) : (
          <div className="space-y-4">
            {reminders.map((job) => {
              const daysLeft = getDaysLeft(
                job.statusDate
              );

              return (
                <div
                  key={job._id}
                  className="border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition"
                >
                  <div>
                    <h2 className="font-semibold text-lg">
                      {job.company}
                    </h2>

                    <p className="text-gray-600">
                      {job.role}
                    </p>

                    <p className="text-sm text-indigo-600 mt-1 capitalize">
                      {job.status}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">
                      {new Date(
                        job.statusDate
                      ).toLocaleDateString()}
                    </p>

                    <p className="text-sm text-red-500">
                      {daysLeft === 0
                        ? "Today"
                        : `${daysLeft} day(s) left`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}