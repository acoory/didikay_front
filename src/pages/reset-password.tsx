import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import Api from "../services/api";

const api = new Api();

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.instance.post("/client/user/reset-password", {
        token,
        newPassword,
      });

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900">
              Token manquant
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Le lien de réinitialisation est invalide ou a expiré.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900">
            Réinitialiser votre mot de passe
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Veuillez entrer votre nouveau mot de passe
          </p>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
          >
            <p className="text-green-800">
              Votre mot de passe a été réinitialisé avec succès !
            </p>
            <p className="text-sm text-green-600 mt-2">
              Vous allez être redirigé vers la page d'accueil...
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative">
                <label htmlFor="new-password" className="sr-only">
                  Nouveau mot de passe
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="new-password"
                  name="new-password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#e86126] focus:border-[#e86126] focus:z-10 sm:text-sm"
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <div className="relative">
                <label htmlFor="confirm-password" className="sr-only">
                  Confirmer le mot de passe
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#e86126] focus:border-[#e86126] focus:z-10 sm:text-sm"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e86126] hover:bg-[#ec7f2b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e86126] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Réinitialisation en cours..." : "Réinitialiser le mot de passe"}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
} 