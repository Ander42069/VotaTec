/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table"; 
import React from "react";
import axios from "axios";
import PageTitle from "@/components/PageTitle";

type Props = {};

type User = {
  nombre: string;
  numero_control: string;
  carrera: string;
  rol_usuario: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          {/*<img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "name"
            )}`}
            alt="user-image"
          />*/}
          <p>{row.getValue("nombre")} </p>
        </div>
      );
    }
  },
  {
    accessorKey: "numero_control",
    header: "Número de control"
  },
  {
    accessorKey: "carrera",
    header: "Carrera"
  },
  {
    accessorKey: "rol_usuario",
    header: "Rol de usuario"
  }
];

/*const data: User[] = [
  {
    name: "Edgar Anderson",
    numero_control: "20550360",
    carrera: "ISC",
    rol_usuario: "Administrador"
  },
  {
    name: "Edgar Anderson",
    numero_control: "20550360",
    carrera: "ISC",
    rol_usuario: "Administrador"
  },
  {
    name: "Edgar Anderson",
    numero_control: "20550360",
    carrera: "ISC",
    rol_usuario: "Administrador"
  },
  {
    name: "Edgar Anderson",
    numero_control: "20550360",
    carrera: "ISC",
    rol_usuario: "Administrador"
  },
  {
    name: "Edgar Anderson",
    numero_control: "20550360",
    carrera: "ISC",
    rol_usuario: "Administrador"
  },
  {
    name: "Edgar Anderson",
    numero_control: "20550360",
    carrera: "ISC",
    rol_usuario: "Administrador"
  },
  {
    name: "Edgar Anderson",
    numero_control: "20550360",
    carrera: "ISC",
    rol_usuario: "Administrador"
  },
];*/

export default function UsersPage({}: Props) {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users"); // Ruta de tu API en Next.js para obtener los usuarios
            const userData = response.data;
            setUser(userData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Administradores" />
      <DataTable columns={columns} data={user} />
    </div>
  );
}