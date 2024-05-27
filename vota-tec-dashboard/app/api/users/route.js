import { NextResponse } from "next/server";
import connect from "@/utils/mongoosedb";
import User from "@/models/user";

export const GET = async (req) => {
    try {
        await connect();
        const adminUsers  = await User.find({ rol_usuario: "ADMIN" });
        return NextResponse.json(adminUsers);
    } catch (error) {
        return NextResponse.error(error);
    }
}