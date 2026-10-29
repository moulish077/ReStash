
import { Router } from "express";
import bcrypt from "bcryptjs";

const router = Router();

type User = {
  email: string;
  password: string;
};

// Temporary storage for testing only
const users: User[] = [];

// Signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid email and a password of at least 6 characters.",
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    return res.status(409).json({
      success: false,
      message: "Email is already registered.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    email: normalizedEmail,
    password: hashedPassword,
  });

  return res.status(201).json({
    success: true,
    message: "Account created successfully!",
  });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const normalizedEmail = String(email ?? "").trim().toLowerCase();

  const user = users.find(
    (item) => item.email === normalizedEmail
  );

  if (
    !user ||
    !(await bcrypt.compare(password ?? "", user.password))
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  return res.json({
    success: true,
    message: "Login successful!",
    user: { email: user.email },
  });
});

export default router;
