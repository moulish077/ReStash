import React from "react";
import "./StatCard.css";

interface StatCardProps {
title: string;
value: string | number;
icon: string;
description: string;
}

const StatCard: React.FC<StatCardProps> = ({
title,
value,
icon,
description,
}) => {
return (
<div className="stat-card">
<div className="stat-card-top">
<span className="stat-card-icon">{icon}</span>
</div>

  <p className="stat-card-title">{title}</p>
  <h2 className="stat-card-value">{value}</h2>
  <p className="stat-card-description">{description}</p>
</div>

);
};

export default StatCard;