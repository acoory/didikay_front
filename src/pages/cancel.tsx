import React, { useEffect, useState } from "react";
import { X, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { CancellationStatus } from "../types/booking";
import { useParams } from "react-router";
import bookingService from "../services/bookingService";

export default function Cancel() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<CancellationStatus>({
    isValid: false,
    message: "",
    isLoading: false,
  });

  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      setStatus({
        isValid: false,
        message: "Le code doit contenir 6 caractères",
        isLoading: false,
      });
    }

    setStatus({ ...status, isLoading: true });

    setTimeout(async () => {
      try {
        await bookingService.cancelBooking(code, id).then((res) => {
          setStatus({
            isValid: true,
            message: "Réservation annulée avec succès",
            isLoading: false,
          });
        });
      } catch (e) {
        setStatus({
          isValid: false,
          message: "Code invalide. Veuillez vérifier votre code et réessayer.",
          isLoading: false,
        });
        console.log(e);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Annulation de réservation</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <X className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900">Annuler votre réservation</h2>
              <p className="text-gray-600 mt-2">Entrez le code d'annulation reçu par email pour confirmer l'annulation de votre réservation</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Code d'annulation
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Entrez le code à 6 caractères"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  maxLength={6}
                />
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg flex items-start space-x-2 ${status.isValid ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                  {status.isValid ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.isLoading || code.length !== 6}
                className={`
                  w-full py-3 px-4 rounded-lg font-medium text-white
                  ${status.isLoading || code.length !== 6 ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}
                  transition-colors
                `}
              >
                {status.isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Vérification...
                  </div>
                ) : (
                  "Annuler la réservation"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Vous n'avez pas reçu de code ? <button className="text-purple-600 hover:text-purple-800 font-medium">Contactez-nous</button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
