import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { InstagramCounter } from './InstagramCounter';
import {useNavigate} from "react-router";

export const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const navigation= useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full transition-all duration-300 ${
                    scrolled ? "bg-white bg-opacity-90 shadow-md backdrop-blur-md" : "bg-transparent"
                } py-4 px-6 md:px-12 flex justify-between items-center z-50
            transform ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"} ease-out`}
                role="banner"
            >
                <div className={`text-2xl md:text-3xl font-bold transition-all ${scrolled ? "text-gray-900" : "text-white"}`}>
                    <a href="/" aria-label="Accueil KAYDIDI Salon">
                        <img src={"../images/logo.png"} alt="Logo KAYDIDI Salon de Coiffure" style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                            borderRadius: "50%",
                        }} className="w-10 h-10" />
                    </a>
                </div>

                {/* Navigation Desktop */}
                <nav className="hidden md:flex space-x-8" aria-label="Navigation principale">
                    <a href="#salon"
                       className={`transition-all font-medium ${scrolled ? "text-gray-900 hover:text-black" : "text-white hover:opacity-80"}`}
                       aria-label="Découvrir le salon">
                        Le Salon
                    </a>
                    <a href="#realisations"
                       className={`transition-all font-medium ${scrolled ? "text-gray-900 hover:text-black" : "text-white hover:opacity-80"}`}
                       aria-label="Voir nos réalisations">
                        Nos Réalisations
                    </a>
                    <a
                        onClick={() => navigation("/reservation")}
                        href="/reservation"
                        className={`transition-all font-medium ${scrolled ? "text-gray-900 hover:text-black" : "text-white hover:opacity-80"}`}
                        aria-label="Réserver un rendez-vous">
                        Réserver
                    </a>
                    <a href="#contact"
                       className={`transition-all font-medium ${scrolled ? "text-gray-900 hover:text-black" : "text-white hover:opacity-80"}`}
                       aria-label="Contacter le salon">
                        Contact
                    </a>
                </nav>

                {/* Réseaux sociaux et Menu Mobile */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block w-[200px] flex justify-end">
                        <InstagramCounter scrolled={scrolled} followers={348}/>
                    </div>

                    {/* Bouton Menu Mobile */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2"
                        aria-expanded={isMenuOpen}
                        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    >
                        {isMenuOpen ? (
                            <X className={`w-6 h-6 ${scrolled ? "text-gray-900" : "text-white"}`}/>
                        ) : (
                            <Menu className={`w-6 h-6 ${scrolled ? "text-gray-900" : "text-white"}`}/>
                        )}
                    </button>
                </div>
            </header>

            {/* Menu Mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
                    isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
            />
            <div
                className={`fixed top-0 right-0 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navigation mobile"
            >
                <div className="p-6 space-y-6">
                    <nav className="flex flex-col space-y-4" aria-label="Navigation mobile">
                        <a href="#salon"
                           className="text-gray-900 hover:text-black font-medium"
                           onClick={() => setIsMenuOpen(false)}>
                            Le Salon
                        </a>
                        <a href="#realisations"
                           className="text-gray-900 hover:text-black font-medium"
                           onClick={() => setIsMenuOpen(false)}>
                            Nos Réalisations
                        </a>
                        <a href="/reservation"
                           className="text-gray-900 hover:text-black font-medium"
                           onClick={() => setIsMenuOpen(false)}>
                            Réserver
                        </a>
                        <a href="#contact"
                           className="text-gray-900 hover:text-black font-medium"
                           onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </a>
                    </nav>

                    <div className="pt-4 border-t">
                        <InstagramCounter scrolled={true} followers={348}/>
                    </div>
                </div>
            </div>
        </>
    );
};