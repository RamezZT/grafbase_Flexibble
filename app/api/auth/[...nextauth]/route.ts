import NextAuth from "next-auth/next";

import { authOpitions } from "@/lib/session";

const handler = NextAuth(authOpitions);

export { handler as GET, handler as POST };