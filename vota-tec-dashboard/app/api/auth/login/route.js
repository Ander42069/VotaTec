import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import connect from "@/utils/mongoosedb";
import User from "@/models/user";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await connect();
    const { numero_control } = await request.json();
    // Pruebas de que se recibió el número de control
    console.log(numero_control);

    // Busca el usuario en la base de datos
    const user = await User.findOne({ numero_control: numero_control }).exec();
    // Pruebas de que se encontró el usuario
    console.log(user);
    console.log(user.get("nombre"));
    console.log(user.numero_control);
    console.log(user.get('rol_usuario'));

    if (user && user.get("rol_usuario") === "ADMIN") {
      // expire in 1h
      const adminToken = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          username: user.get("nombre"),
          numero_control,
          carrera: user.get("carrera"),
          rol_usuario: user.get("rol_usuario"),
          voto: user.get("voto"),
        },
        process.env.JWT_SECRET
      );

      const adminResponse = NextResponse.json({
        token: adminToken,
        rol_usuario: user.get("rol_usuario"),
      });

      adminResponse.cookies.set({
        name: "adminToken",
        value: adminToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
        path: "/",
      });

      return adminResponse;
    } else if (user && user.get("rol_usuario") === "ALUMNO" && user.get("voto") === "NO") {
      // expire in 10 minutes
      const userToken = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 10,
          username: user.get("nombre"),
          numero_control,
          carrera: user.get("carrera"),
          rol_usuario: user.get("rol_usuario"),
          voto: user.get("voto"),
        },
        process.env.JWT_SECRET
      );

      const userResponse = NextResponse.json({
        token: userToken,
        rol_usuario: user.get("rol_usuario"),
      });

      userResponse.cookies.set({
        name: "userToken",
        value: userToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 10,
        path: "/",
      });

      return userResponse;
    }

    // Si no se encuentra el usuario o tiene un rol desconocido, se devuelve un mensaje de error
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed');
  }
}

