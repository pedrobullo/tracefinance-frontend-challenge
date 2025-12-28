export interface StepperStep {
  id: string;
  label: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
  lineHeight?: number;
  testId?: string;
}

function StepIcon({
  isActive,
  isCompleted,
  testId,
}: {
  isActive: boolean;
  isCompleted: boolean;
  testId: string;
}) {
  if (isCompleted) {
    return (
      <div
        className="w-[18px] h-[18px] rounded-full flex items-center justify-center bg-brand-primary transition-colors"
        data-testid={testId}
      >
        <svg
          className="w-3 h-3 text-fixed-level-one"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    );
  }
  return (
    <div
      className="relative w-[18px] h-[18px] rounded-full bg-fixed-level-four flex items-center justify-center transition-colors"
      data-testid={testId}
    >
      {isActive && (
        <div className="w-[10px] h-[10px] rounded-full bg-brand-primary" />
      )}
    </div>
  );
}

export function Stepper({
  steps,
  currentStep,
  orientation = "vertical",
  className = "",
  lineHeight = 40,
  testId = "stepper",
}: StepperProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={`${isVertical ? "flex flex-col" : "flex items-center gap-4"} ${className}`}
      data-testid={testId}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isPreviousCompleted = index > 0 && index - 1 < currentStep;

        return (
          <div
            key={step.id}
            className={`flex ${isVertical ? "items-start" : "items-center"}`}
            data-testid={`${testId}-step-${index}`}
            data-active={isActive}
            data-completed={isCompleted}
          >
            <div
              className={`flex ${isVertical ? "flex-col items-center" : "items-center"}`}
            >
              <StepIcon
                isActive={isActive}
                isCompleted={isCompleted}
                testId={`${testId}-indicator-${index}`}
              />
              {!isLast && isVertical && (
                <div
                  className={`w-px transition-colors ${isPreviousCompleted || isCompleted ? "bg-brand-primary" : "bg-fixed-level-four"}`}
                  style={{ height: `${lineHeight}px` }}
                />
              )}
              {!isLast && !isVertical && (
                <div
                  className={`h-px w-8 mx-2 transition-colors ${isPreviousCompleted || isCompleted ? "bg-brand-primary" : "bg-fixed-level-four"}`}
                />
              )}
            </div>
            <span
              className={`
                ml-3 text-sm font-medium transition-colors
                ${isActive || isCompleted ? "text-fixed-primary" : "text-fixed-tertiary"}
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
