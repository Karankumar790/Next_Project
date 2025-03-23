// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import {connectDB} from "@/utils/db";
// import User from "@/models/user";

// export async function POST(req: Request) {
//   await connectDB();
//   const { email, password } = await req.json();

//   const user = await User.findOne({ email });
//   if (!user) return NextResponse.json({ error: "Invalid email !" }, { status: 401 });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return NextResponse.json({ error: "Invalid password!" }, { status: 401 });

//   if (!process.env.JWT_SECRET) {
//     return NextResponse.json({ error: "JWT_SECRET is missing!" }, { status: 500 });
//   }
//   console.log("JWT_SECRET: ", process.env.JWT_SECRET);
//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

//   return NextResponse.json({ token, user: { id: user._id, username: user.username, email: user.email } }, { status: 200 });
// }

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/utils/db";
// import User from "@/models/user";

// export async function POST(req: Request) {
//   require("dotenv").config();
//   await connectDB();

//   const { email, password } = await req.json();

//   const user = await User.findOne({ email });
//   if (!user) return NextResponse.json({ error: "Invalid email!" }, { status: 401 });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return NextResponse.json({ error: "Invalid password!" }, { status: 401 });

//   const jwtSecret = process.env.JWT_SECRET;
//   console.log(jwtSecret,"skjhkjhsdkjhkj");
//   if (!jwtSecret) {
//     console.error("JWT_SECRET environment variable is missing.");
//     return NextResponse.json({ error: "JWT_SECRET is missing!" }, { status: 500 });
//   }

//   console.log("JWT_SECRET: ", jwtSecret);

//   // Generate JWT token
//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     jwtSecret,
//     { expiresIn: "1h" }
//   );

//   return NextResponse.json(
//     {
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     },
//     { status: 200 }
//   );
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/utils/db";
import User from "@/models/user";

export async function POST(req: Request) {
  // DB connection (no need to load dotenv here)
  await connectDB();

  const { email, password } = await req.json();

  // Find user by email
  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "Invalid email!" }, { status: 401 });

  // Check for JWT secret from environment variables
  const jwtSecret = process.env.JWT_SECRET;
  console.log("JWT_SECRET:", jwtSecret); // Debugging line
  if (!jwtSecret) {
    console.error("JWT_SECRET environment variable is missing.");
    return NextResponse.json(
      { error: "JWT_SECRET is missing!" },
      { status: 500 }
    );
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return NextResponse.json({ error: "Invalid password!" }, { status: 401 });

  // Generate JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
    expiresIn: "1h",
  });

  // Send token and user info in the response
  return NextResponse.json(
    {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
    { status: 200 }
  );
}
