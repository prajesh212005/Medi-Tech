import React from "react";

function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <DashboardCard title="Users" value="1,234" />
        <DashboardCard title="Revenue" value="$12,345" />
        <DashboardCard title="Conversion" value="12.3%" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-3">Activity Overview</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            Chart Placeholder
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-3">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="border-b pb-3">User login - 2 minutes ago</li>
            <li className="border-b pb-3">
              New report generated - 15 minutes ago
            </li>
            <li className="border-b pb-3">System update - 1 hour ago</li>
            <li className="pb-3">Database backup - 3 hours ago</li>
          </ul>
        </div>
      </div>
    </>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}

export default Dashboard;
