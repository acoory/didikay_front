import React from 'react';
import { Check } from 'lucide-react';
import { BookingStep } from '../types/booking';

interface StepperProps {
  currentStep: BookingStep;
  steps: { id: string; label: string; icon: React.ReactNode }[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative group">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#e86126] border-[#e86126] text-white'
                      : isCurrent
                        ? 'border-[#e86126] text-[#e86126] scale-110 shadow-md'
                        : 'border-gray-300 text-gray-400 group-hover:border-gray-400 group-hover:text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : step.icon}
                </div>
                <span
                  className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                    isCurrent ? 'text-[#e86126]' : isCompleted ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                >
                  {step.label}
                </span>
                {isCurrent && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#e86126] rounded-full animate-pulse"></div>
                )}
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-1 transition-all duration-500 ${
                    index < currentStepIndex 
                      ? 'bg-[#e86126]' 
                      : index === currentStepIndex 
                        ? 'bg-gradient-to-r from-[#e86126] via-[#e86126] to-gray-300' 
                        : 'bg-gray-300'
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