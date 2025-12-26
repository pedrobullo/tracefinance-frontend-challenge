export interface StepperStep {
  id: string;
  label: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  orientation = "vertical",
  className = "",
}: StepperProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={`${isVertical ? "flex flex-col" : "flex items-center gap-4"} ${className}`}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={step.id}
            className={`flex ${isVertical ? "items-start" : "items-center"}`}
          >
            <div
              className={`flex ${isVertical ? "flex-col items-center" : "items-center"}`}
            >
              {/* Círculo */}
              <div
                className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${isActive || isCompleted ? "bg-primary border-primary" : "border-gray-400"}
                `}
              />
              {/* Linha conectora vertical */}
              {!isLast && isVertical && (
                <div
                  className={`w-0.5 h-8 my-1 ${isCompleted ? "bg-primary" : "bg-gray-300"}`}
                />
              )}
            </div>
            {/* Label */}
            <span
              className={`
                ml-3 text-sm font-medium ${isLast && isVertical ? "" : "pb-8"}
                ${isActive || isCompleted ? "text-white" : "text-gray-400"}
              `}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
