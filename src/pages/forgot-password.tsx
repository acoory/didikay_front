import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import Api from "../services/api";

const api = new Api();

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await api.instance.post("/client/user/forgot-password", {
        email,
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
            Mot de passe oublié
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </p>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
          >
            <p className="text-green-800">
              Un email de réinitialisation a été envoyé à votre adresse email.
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
                <label htmlFor="email" className="sr-only">
                  Adresse email
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#e86126] focus:border-[#e86126] focus:z-10 sm:text-sm"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-sm text-[#e86126] hover:text-[#ec7f2b] flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>
              <button
                type="submit"
                disabled={isLoading || !email}
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e86126] hover:bg-[#ec7f2b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e86126] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
} 