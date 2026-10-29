
import "./DashboardHeader.css";

const DashboardHeader = () => {
return (
<header className="dashboard-header">
<div className="header-welcome">
<h1>Welcome back!</h1>
<p>Here's what's happening with your resources today.</p>
</div>

  <div className="header-user">
    <div className="header-notification">🔔</div>

    <div className="header-avatar">U</div>

    <div className="header-user-info">
      <h4>User</h4>
      <span>Resource Member</span>
    </div>
  </div>
</header>

);
};

export default DashboardHeader;