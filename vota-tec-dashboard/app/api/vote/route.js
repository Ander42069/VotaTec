import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connect from "@/utils/mongoosedb";
import User from "@/models/user";
import Vote from "@/models/vote";
import { cookies } from "next/headers";
import { set } from "mongoose";

export async function POST(request) {
    try {
        // Obtiene el token del usuario
        const cookieStore = cookies();
        const token = cookieStore.get("userToken");

        // Imprime el token
        console.log(token);


        const { numero_control } = jwt.verify(token.value, process.env.JWT_SECRET);

        console.log(numero_control);

        //const voto = "NO";


        if (!token) {
            return NextResponse.json({
                message: "Not logged in",
            }, {
                status: 401,
            })
        }

        const { candidate } = await request.json();
        console.log(candidate);

        connect();
        const user = await User.findOneAndUpdate(
            { numero_control: numero_control },
            { voto: 'SI' },
            { new: 'SI' }
        );

        console.log(user);

        //console.log(user.get("voto"));

        // Verificar si el usuario ya votó
        if (!user) {
            throw new Error('Usuario no encontrado o ya votó');
        }

        //const vote = await Vote.create({ voto: user, candidato: candidate });
        //console.log(vote);

        return NextResponse.json({ message: "Ya voto", });
    } catch (error) {
        console.log(error);
        return NextResponse.json(error.message, {
            status: 500,
        });
    }
}