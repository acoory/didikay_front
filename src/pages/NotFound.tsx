import React from "react";
import { Link } from "react-router";
import { Home, AlertTriangle } from "lucide-react";
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Page non trouvée | KAYDIDI Salon de Coiffure</title>
        <meta name="description" content="La page que vous recherchez n'existe pas." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-[#e86126]" />
            <h1 className="text-2xl font-bold text-gray-900">Page non trouvée</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-center mb-6">
              <AlertTriangle className="h-16 w-16 text-[#e86126] mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900">Oups ! Page introuvable</h2>
              <p className="text-gray-600 mt-4 mb-6">
                La page que vous recherchez n'existe pas ou a été déplacée.
              </p>
              
              <Link 
                to="/" 
                className="inline-flex items-center justify-center px-6 py-3 bg-[#e86126] text-white font-medium rounded-lg hover:bg-[#ec7f2b] transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 