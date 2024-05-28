"use client"

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "/app/globals.css";

// Define el tipo de las credenciales
interface Credentials {
  numero_control: string;
  password: string;
}

// Definimos un tipo para manejar la carta activa
type ActiveCard = "loginUser" | "loginAdmin" | "registerUser" | "registerAdmin" | null;

// Componente funcional Home
const Home: React.FC = () => {
  const [activeCard, setActiveCard] = useState<ActiveCard>(null);
  const [credentials, setCredentials] = useState<Credentials>({
    numero_control: "",
    password: ""
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", credentials);
      console.log(res);

      if (res.status === 200) {
        console.log(res.data);
        const { rol_usuario } = res.data;
        console.log(rol_usuario);

        if (rol_usuario === "ADMIN") {
          router.push("/dashboard");
        } else if (rol_usuario === "ALUMNO") {
          router.push("/vote");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", credentials);
      console.log(res);

      if (res.status === 200) {
        console.log(res.data);
        // Redirigir o mostrar mensaje de registro exitoso
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cards = [
    {
      type: "loginUser" as ActiveCard,
      title: "Login Usuario",
      image: "images/user-login.png" // Reemplaza con la ruta de tu imagen
    },
    {
      type: "loginAdmin" as ActiveCard,
      title: "Login Administrador",
      image: "images/admin-login.png" // Reemplaza con la ruta de tu imagen
    },
    {
      type: "registerUser" as ActiveCard,
      title: "Registro Usuario",
      image: "images/user-registration.png" // Reemplaza con la ruta de tu imagen
    },
    {
      type: "registerAdmin" as ActiveCard,
      title: "Registro Administrador",
      image: "images/user-registration.png" // Reemplaza con la ruta de tu imagen
    }
  ];

  return (
    <div className="flex items-center justify-center h-screen space-x-4">
      {cards.map((card) => (
        <div
          key={card.type}
          className="w-1/4 cursor-pointer"
          onClick={() => setActiveCard(card.type)}
        >
          <div
            className={`border p-4 rounded-lg transition-transform transform ${
              activeCard === card.type ? "scale-105" : ""
            }`}
            style={{ height: "400px" }} // Hacer que las cartas sean rectangulares
          >
            <img 
              src={card.image} 
              alt={card.title} 
              className="w-full h-full object-cover mb-4 rounded-lg" 
              style={{ objectFit: "cover" }} // Hacer que las imágenes se ajusten al contenedor
            />
            <h2 className="text-center mb-2">{card.title}</h2>
            {activeCard === card.type && (
              <form
                onSubmit={card.type.includes("login") ? handleSubmit : handleRegister}
              >
                <input
                  type="text"
                  placeholder="Número de control"
                  value={credentials.numero_control}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      numero_control: e.target.value,
                    })
                  }
                  className="border border-gray-300 rounded px-2 py-1 mb-4 w-full dark:text-gray-800"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                  className="border border-gray-300 rounded px-2 py-1 mb-4 w-full dark:text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300 w-full"
                >
                  {card.type.includes("login") ? "Acceder" : "Registrar"}
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
