import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";


export default function SlotNotAvailable() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white shadow-md rounded-lg p-8 text-center max-w-md"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.2 }}
                    className="mb-4"
                >
                    <AlertTriangle className="text-red-500 w-16 h-16 mx-auto" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl font-bold text-gray-800 mb-2"
                >
                    Créneau non disponible
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-gray-600 mb-4"
                >
                    Le créneau choisi n'est malheureusement plus disponible. nous vous avons remboursé le montant de votre réservation sur le moyen de paiement utilisé.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="text-sm text-gray-500 mb-6"
                >
                    Vous pouvez essayer de réserver un autre créneau.
                </motion.p>

                <motion.a
                    onClick={() => navigate("/reservation")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ cursor: "pointer" }}
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700"
                >
                    Choisir un autre créneau
                </motion.a>
            </motion.div>
        </div>
    );
}
