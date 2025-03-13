import React from "react";
import { CreditCard, Lock } from "lucide-react";
import stripeService from "../services/stripeService";

export function PaymentStep(props: any) {
  const { userInfo, selection, devis } = props;

  console.log("devis", devis);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <Lock className="h-12 w-12 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Paiement sécurisé 🔒</h3>
        <p className="text-gray-600">Votre paiement est sécurisé par notre système de paiement</p>
      </div>

      <button
        onClick={async () => {
          const redirect = await stripeService.createPayment({
            formData: userInfo,
            devis: devis,
            booking: selection.slot,
          });
          // window.open(redirect.data.url, "_blank");
          window.location.href = redirect.data.url;

          console.log("devis", devis);
          console.log("selection", selection);
          console.log("userInfo", userInfo);
        }}
        className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors"
      >
        <CreditCard className="h-5 w-5" />
        <span>Procéder au paiement</span>
      </button>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>🔒 Paiement sécurisé</p>
        <p>✨ Confirmation immédiate</p>
        <p>📱 Rappel SMS avant le rendez-vous</p>
      </div>
    </div>
  );
}
