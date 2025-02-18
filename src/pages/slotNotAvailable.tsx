import { XCircle } from "lucide-react";

export default function SlotNotAvailable() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
        <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Créneau indisponible</h2>
        <p className="text-gray-600 mb-4">Désolé, le créneau sélectionné n'est plus disponible. Veuillez choisir un autre horaire.</p>
      </div>
    </div>
  );
}
