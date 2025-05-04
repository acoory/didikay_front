import { Calendar, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function RescheduleCancel() {
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
                    className="mb-4 flex justify-center"
                >
                    <div className="relative">
                        <Calendar className="text-gray-400 w-16 h-16 mx-auto" />
                        <XCircle className="text-red-500 w-8 h-8 absolute -bottom-1 -right-1" />
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl font-bold text-gray-800 mb-2"
                >
                    Modification annulée
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-gray-600 mb-4"
                >
                    La demande de modification de votre rendez-vous a été annulée. Votre rendez-vous initial reste inchangé.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="text-sm text-gray-500 mb-6"
                >
                    Si vous souhaitez tout de même modifier votre rendez-vous, vous pouvez faire une nouvelle demande depuis votre espace client ou nous contacter directement.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center"
                >
                    <a 
                        href="/"
                        className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        Retour à l'accueil
                    </a>
                    <a 
                        href="/reservation"
                        className="inline-block px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                        Nouvelle réservation
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
} 