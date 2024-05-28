"use client"

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Candidate {
  name: string;
  slogan: string;
  description: string;
  proposals: string[];
  values: string[];
  imageUrl: string;
}

const candidates: Candidate[] = [
  { 
    name: 'Candidato 1', 
    slogan: '¡Por un futuro brillante!', 
    description: 'Candidato 1 es conocido por su arduo trabajo y dedicación a la comunidad.',
    proposals: ['Mejorar la educación', 'Aumentar el presupuesto para salud'],
    values: ['Honestidad', 'Transparencia', 'Trabajo duro'],
    imageUrl: '/images/candidato1.jpg' 
  },
  { 
    name: 'Candidato 2', 
    slogan: '¡Juntos construiremos un mejor mañana!', 
    description: 'Candidato 2 ha trabajado incansablemente para mejorar nuestras infraestructuras.',
    proposals: ['Construir nuevas carreteras', 'Modernizar el transporte público'],
    values: ['Compromiso', 'Innovación', 'Responsabilidad'],
    imageUrl: '/images/candidato2.jpg' 
  },
  { 
    name: 'Candidato 3', 
    slogan: '¡Innovación y progreso!', 
    description: 'Candidato 3 trae nuevas ideas y soluciones innovadoras para nuestros problemas actuales.',
    proposals: ['Fomentar la tecnología en la educación', 'Apoyar a startups locales'],
    values: ['Creatividad', 'Progreso', 'Inclusión'],
    imageUrl: '/images/candidato3.jpg' 
  },
];

const VotePage: React.FC = () => {
  const router = useRouter();
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const handleVote = useCallback(async (candidate: Candidate) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/vote', { candidate });
      console.log(res.data);
      console.log(`Votaste por ${candidate.name}`);
      setVoted(true);
      router.push('/thanks');
    } catch (err) {
      setError('Hubo un error al enviar tu voto. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleExpand = (name: string) => {
    if (expandedCandidate === name) {
      setExpandedCandidate(null);
      setShowBackdrop(false);
    } else {
      setExpandedCandidate(name);
      setShowBackdrop(true);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100 p-4">
      {showBackdrop && <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl ${expandedCandidate ? 'relative z-10' : ''}`}>
        {candidates.map((candidate, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-md transition-all duration-300 p-4 ${expandedCandidate === candidate.name ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg z-20' : ''}`}>
            <img src={candidate.imageUrl} alt={candidate.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h2 className="text-xl font-bold mb-2 text-center">{candidate.name}</h2>
            <p className="text-gray-600 text-center">{candidate.slogan}</p>
            <button 
              onClick={() => handleExpand(candidate.name)} 
              className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              {expandedCandidate === candidate.name ? 'Mostrar Menos' : 'Mostrar Más'}
            </button>
            {expandedCandidate === candidate.name && (
              <div className="mt-4">
                <p className="text-gray-700">{candidate.description}</p>
                <h3 className="text-lg font-bold mt-4">Propuestas:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {candidate.proposals.map((proposal, i) => (
                    <li key={i}>{proposal}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-bold mt-4">Valores:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {candidate.values.map((value, i) => (
                    <li key={i}>{value}</li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleVote(candidate)} 
                  className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Votar'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotePage;
