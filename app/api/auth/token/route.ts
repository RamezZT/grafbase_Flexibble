import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const token = await getToken({ req, raw: true });

        return NextResponse.json(token, { status: 200 });
    } catch (error) {
        console.log(error);
    }
}