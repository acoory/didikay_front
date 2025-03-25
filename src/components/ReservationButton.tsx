import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from "react-router";

export const ReservationButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <button
            onClick={() => navigate("/reservation")}
            className={`
        relative bg-gradient-to-r from-[#e86126] to-[#ec7f2b] text-white 
        px-8 py-3 rounded-full font-semibold text-lg flex items-center gap-2 
        overflow-hidden group hover:shadow-lg hover:bg-gradient-to-r hover:from-[#e86126] hover:to-[#ec7f2b]
        transition-all duration-1000 ease-out
        transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}
        >
            {/* Effet de brillance */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Icône avec rotation */}
            <div className={`
        relative z-10 transition-transform duration-300 group-hover:rotate-12
        ${isVisible ? 'scale-100' : 'scale-0'}
        transition-transform duration-500 delay-300
      `}>
                <Calendar className="w-5 h-5" />
            </div>

            {/* Texte */}
            <span className={`
        relative z-10 transition-all duration-300
        ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
        transition-all duration-500 delay-400
      `}>
        Réserver maintenant
      </span>

            {/* Flèche animée */}
            <span className="relative z-10 ml-1 transform transition-all duration-300 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
        <svg
            className="w-5 h-5 animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M4 12H20M20 12L14 6M20 12L14 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
          />
        </svg>
      </span>
        </button>
    );
};