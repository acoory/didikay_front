import { CheckCircle } from "lucide-react";

export default function BookingSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Réservation confirmée !</h2>
        <p className="text-gray-600 mb-4">Merci pour votre réservation. Vous recevrez un e-mail de confirmation sous peu.</p>
        <p className="text-sm text-gray-500">Si vous ne trouvez pas l'e-mail, pensez à vérifier votre dossier de courriers indésirables (spam).</p>
      </div>
    </div>
  );
}
