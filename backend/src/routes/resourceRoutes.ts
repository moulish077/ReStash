import { Router } from "express";
import { resources } from "../data/resources";
import type { Resource } from "../data/resources";

const router = Router();

// Get all resources
router.get("/", (_req, res) => {
  res.json({
    success: true,
    count: resources.length,
    data: resources,
  });
});

// Get one resource by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const resource = resources.find((item) => item.id === id);

  if (!resource) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  return res.json({
    success: true,
    data: resource,
  });
});

// Add a new resource
router.post("/", (req, res) => {
  const { name, description, category, location, owner } = req.body;

  if (
    !name ||
    !description ||
    !category ||
    !location ||
    !owner
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newResource: Resource = {
    id: resources.length
      ? Math.max(...resources.map((item) => item.id)) + 1
      : 1,
    name,
    description,
    category,
    location,
    owner,
    available: true,
  };

  resources.push(newResource);

  return res.status(201).json({
    success: true,
    message: "Resource created successfully",
    data: newResource,
  });
});

export default router;