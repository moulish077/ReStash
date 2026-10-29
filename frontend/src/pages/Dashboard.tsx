
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import RecentBookings from "../components/RecentBookings";
import "./Dashboard.css";

const Dashboard = () => {
return (
<div className="dashboard-layout">
<DashboardSidebar />

  <main className="dashboard-main">
    <DashboardHeader />

    <div className="dashboard-content">
      <div className="dashboard-page-title">
        <h2>Dashboard Overview</h2>
        <p>Track your resources and recent activities.</p>
      </div>

      <div className="dashboard-stats">
        <StatCard
          title="Total Resources"
          value={12}
          icon="📦"
          description="Resources listed"
        />

        <StatCard
          title="Active Bookings"
          value={5}
          icon="📅"
          description="Currently active"
        />

        <StatCard
          title="Pending Requests"
          value={3}
          icon="⏳"
          description="Awaiting approval"
        />

        <StatCard
          title="Completed Bookings"
          value={18}
          icon="✅"
          description="Successfully completed"
        />
      </div>

      <RecentBookings />
    </div>
  </main>
</div>

);
};

export default Dashboard;