// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/utils/db";
// import Post from "@/models/post";
// import { getUserFromToken } from "@/utils/auth";

// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();

//     // Extract token from Authorization header
//     const token = req.headers.get("authorization")?.split(" ")[1];
//     if (!token)
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     // Get user from token
//     const user = await getUserFromToken(token);
//     if (!user)
//       return NextResponse.json({ error: "Invalid token" }, { status: 403 });

//     const posts = await Post.find({ userId: user.id }).sort({ createdAt: -1 });
//     return NextResponse.json(posts, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch user posts" },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import  connectDB  from "@/lib/db";
// import Post from "@/models/post";
// import { getUserFromToken } from "@/lib/auth";

// export async function GET(req: NextRequest) {
//   try {
//     console.log("🔵 API Hit: /api/post/users");

//     await connectDB();

//     // Extract token from Authorization header
//     const authHeader = req.headers.get("authorization");
//     console.log("🟡 Authorization Header:", authHeader);

//     const token = authHeader?.split(" ")[1];
//     if (!token) {
//       console.log("🔴 No Token Provided");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Get user from token
//     const user = await getUserFromToken(token);
//     if (!user) {
//       console.log("🔴 Invalid Token");
//       return NextResponse.json({ error: "Invalid token" }, { status: 403 });
//     }

//     console.log("🟢 User Authenticated:", user);

//     const posts = await Post.find({ userId: user.id }).sort({ createdAt: -1 });
//     return NextResponse.json(posts, { status: 200 });
//   } catch (error) {
//     console.error("🔴 Error fetching user posts:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch user posts" },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/post";
import { getUserFromToken } from "@/lib/auth";

// 🔥 Fix: Ensure Next.js treats this API as a dynamic route
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    console.log("🔵 API Hit: /api/post/users");

    await connectDB();

    // ✅ Fix: Ensure headers are read correctly
    const authHeader = req.headers.get("authorization");
    console.log("🟡 Authorization Header:", authHeader);

    if (!authHeader) {
      console.log("🔴 No Authorization Header");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("🔴 No Token Provided");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Fix: Ensure `getUserFromToken` is correctly awaited
    const user = await getUserFromToken(token);
    if (!user) {
      console.log("🔴 Invalid Token");
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    console.log("🟢 User Authenticated:", user);

    // ✅ Fix: Ensure database queries use correct field names
    const posts = await Post.find({ userId: user.id }).sort({ createdAt: -1 });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("🔴 Error fetching user posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch user posts", details: (error as Error).message },
      { status: 500 }
    );
  }
}
