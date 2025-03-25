// import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { NextRequest } from "next/server";
import connectDB from "./db";
import User from "@/models/user";

export async function verifyToken(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("❌ No Authorization Header");
      return null;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("❌ JWT Secret is missing!");
      return null;
    }

    const decoded = jwt.verify(token, secret) as { id: string; role: string };
    return { userId: decoded.id, role: decoded.role }; // Return userId
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    return null;
  }
}

export const getUserFromToken = async (token: string) => {
  try {
    await connectDB();
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return await User.findById(decoded.id);
  } catch (error) {
    return null;
  }
};