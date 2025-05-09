import { useEffect } from "react";
import { Calendar, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function RescheduleSuccess() {
    useEffect(() => {
        const duration = 1 * 1000; // 1 seconde
        const animationEnd = Date.now() + duration;
        const colors = ["#4CAF50", "#FFEB3B", "#FF5722", "#03A9F4", "#E91E63", "#9C27B0", "#00BCD4", "#FFC107", "#795548"];

        function launchConfetti() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors,
            });

            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors,
            });

            if (Date.now() < animationEnd) {
                requestAnimationFrame(launchConfetti);
            }
        }

        launchConfetti();
    }, []);

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
                        <Calendar className="text-blue-500 w-16 h-16 mx-auto" />
                        <CheckCircle className="text-green-500 w-8 h-8 absolute -bottom-1 -right-1" />
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl font-bold text-gray-800 mb-2"
                >
                    Rendez-vous modifié avec succès !
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-gray-600 mb-4"
                >
                    Votre rendez-vous a été reprogrammé avec succès. Vous recevrez un e-mail de confirmation avec les nouveaux détails sous peu.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="text-sm text-gray-500"
                >
                    Si vous ne trouvez pas l'e-mail, pensez à vérifier votre dossier de courriers indésirables (spam).
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="mt-6"
                >
                    <a 
                        href="/"
                        className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        Retour à l'accueil
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
} 