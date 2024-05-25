"use client"

import React, { useState, FormEvent } from "react";
import axios from "axios";
//import { cn } from "@/lib/utils";
//import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import "/app/globals.css";

// Define el tipo de las credenciales
interface Credentials {
  numero_control: string;
}

// Componente funcional Home
const Home: React.FC = () => {
  // Estado para almacenar las credenciales del usuario
  const [credentials, setCredentials] = useState<Credentials>({
    numero_control: "",
  });

  // Hook para manejar las rutas
  const router = useRouter();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Realiza la solicitud POST al backend
      const res = await axios.post("/api/auth/login", credentials);
      
      // Imprime la respuesta de la solicitud al backend en la consola
      console.log(res);

      // Verifica si la solicitud fue exitosa
      if (res.status === 200) {
        
        // Imprime datos devueltos por el servidor en la respuesta. 
        console.log(res.data);

        // Extrae el rol del usuario de la respuesta
        const { rol_usuario } = res.data;

        // Imprime el rol del usuario en la consola
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

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
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
          className="border border-gray-300 rounded px-2 py-1 mb-4 dark:text-gray-800"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border border-gray-300 rounded px-2 py-1 mb-4 dark:text-gray-800"
        />
        <button 
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300">
          Acceder
          </button>
      </form>
    </div> 
  );
};

export default Home;