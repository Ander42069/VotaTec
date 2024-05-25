"use client"

import React from 'react';
import Link from 'next/link';
import "/app/globals.css";

const ThankYouPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">¡Gracias por votar!</h1>
      <Link href="/">
        Volver al inicio
      </Link>
    </div>
  );
}

export default ThankYouPage;
