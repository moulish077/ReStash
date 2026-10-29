
import "./MyResources.css";

const MyResources = () => {
const resources = [
{ id: 1, name: "Study Table", category: "Furniture", status: "Available" },
{ id: 2, name: "Engineering Books", category: "Books", status: "Shared" },
{ id: 3, name: "Laptop Stand", category: "Electronics", status: "Available" },
];

return (
<div className="my-resources">
<h1>My Resources</h1>
<p>Manage your shared and saved resources here.</p>

  <div className="resources-grid">
    {resources.map((resource) => (
      <div className="resource-card" key={resource.id}>
        <h3>{resource.name}</h3>
        <p>Category: {resource.category}</p>
        <span className="resource-status">{resource.status}</span>
      </div>
    ))}
  </div>
</div>

);
};

export default MyResources;