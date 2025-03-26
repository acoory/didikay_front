import React, { useRef } from 'react';
import CountUp from 'react-countup';
import { Instagram } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InstagramCounterProps {
    scrolled: boolean;
    followers?: number;
}

export const InstagramCounter: React.FC<InstagramCounterProps> = ({ scrolled, followers = 1000 }) => {
    const iconRef = useRef<HTMLDivElement>(null);

    const handleComplete = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            const x = (rect.left + rect.width) / window.innerWidth;
            const y = (rect.top + rect.height) / window.innerHeight;

            confetti({
                particleCount: 200,
                spread: 80,
                startVelocity: 30,
                scalar: 0.5,
                ticks: 40,
                origin: { x, y },
                colors: ['#E1306C', '#833AB4', '#405DE6'],
                shapes: ['circle'],
                gravity: 1.5,
                decay: 0.8,
                drift: 0,
            });
        }
    };

    return (
        <a
            href="https://www.instagram.com/_kaydidi_"
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-2 transition-transform transform hover:scale-110 ${
                scrolled ? "text-gray-700 hover:text-pink-500" : "text-white hover:text-pink-400"
            }`}
        >
            <div ref={iconRef}>
                <Instagram className="w-6 h-6" />
            </div>
            <div className="flex items-center">
                <CountUp
                    end={followers}
                    duration={3}
                    separator=" "
                    className="text-sm font-medium"
                    onEnd={handleComplete}
                />
                <span className="text-sm font-medium ml-1">
          followers
        </span>
            </div>
        </a>
    );
}