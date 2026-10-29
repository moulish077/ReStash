
import "./DashboardSidebar.css";

const DashboardSidebar = () => {
return (
<aside className="dashboard-sidebar">
<div className="sidebar-logo">
<h2>ReStash</h2>
</div>

  <nav className="sidebar-nav">
    <a href="/dashboard" className="sidebar-link active">
      <span>🏠</span> Dashboard
    </a>

    <a href="/resources" className="sidebar-link">
      <span>📦</span> My Resources
    </a>

    <a href="/bookings" className="sidebar-link">
      <span>📅</span> Bookings
    </a>

    <a href="/messages" className="sidebar-link">
      <span>💬</span> Messages
    </a>

    <a href="/settings" className="sidebar-link">
      <span>⚙️</span> Settings
    </a>
  </nav>

  <div className="sidebar-footer">
    <p>Share more. Waste less.</p>
  </div>
</aside>

);
};

export default DashboardSidebar;