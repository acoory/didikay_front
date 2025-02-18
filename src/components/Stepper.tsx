import React from 'react';
import { Check, Clock, CreditCard, Scissors, User } from 'lucide-react';
import { BookingStep } from '../types/booking';

interface StepperProps {
  currentStep: BookingStep;
}

const steps: { id: BookingStep; label: string; icon: React.ReactNode }[] = [
  { id: 'services', label: 'Services', icon: <Scissors className="w-6 h-6" /> },
  { id: 'date', label: 'Date', icon: <Clock className="w-6 h-6" /> },
  { id: 'info', label: 'Informations', icon: <User className="w-6 h-6" /> },
  { id: 'payment', label: 'Paiement', icon: <CreditCard className="w-6 h-6" /> },
];

export function Stepper({ currentStep }: StepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isCompleted
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : isCurrent
                      ? 'border-purple-600 text-purple-600'
                      : 'border-gray-300 text-gray-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    isCurrent ? 'text-purple-600' : isCompleted ? 'text-gray-900' : 'text-gray-300'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 ${
                    index < currentStepIndex ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}