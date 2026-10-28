export interface Resource {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  owner: string;
  available: boolean;
}

export const resources: Resource[] = [
  {
    id: 1,
    name: "Projector",
    description: "HD projector for presentations and events",
    category: "Electronics",
    location: "College Block A",
    owner: "Admin",
    available: true,
  },
  {
    id: 2,
    name: "Seminar Hall",
    description: "Hall suitable for workshops and meetings",
    category: "Space",
    location: "College Block B",
    owner: "Facilities Team",
    available: true,
  },
];