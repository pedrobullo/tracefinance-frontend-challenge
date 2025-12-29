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

  if (isVertical) {
    return (
      <div className={`flex flex-col ${className}`} data-testid={testId}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const lineColor = isCompleted
            ? "bg-brand-primary"
            : "bg-fixed-level-four";
          return (
            <div
              key={step.id}
              className="flex items-start"
              data-testid={`${testId}-step-${index}`}
              data-active={isActive}
              data-completed={isCompleted}
            >
              <div className="flex flex-col items-center">
                <StepIcon
                  isActive={isActive}
                  isCompleted={isCompleted}
                  testId={`${testId}-indicator-${index}`}
                />
                {!isLast && (
                  <div
                    className={`w-px transition-colors ${lineColor}`}
                    style={{ height: `${lineHeight}px` }}
                  />
                )}
              </div>
              <span
                className={`ml-3 text-sm font-medium transition-colors ${isActive || isCompleted ? "text-fixed-primary" : "text-fixed-tertiary"}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className={`flex items-start ${className}`} data-testid={testId}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const lineColor = isCompleted
          ? "bg-brand-primary"
          : "bg-fixed-level-four";
        return (
          <div
            key={step.id}
            className="flex items-center"
            data-testid={`${testId}-step-${index}`}
            data-active={isActive}
            data-completed={isCompleted}
          >
            <div className="flex flex-col items-center">
              <StepIcon
                isActive={isActive}
                isCompleted={isCompleted}
                testId={`${testId}-indicator-${index}`}
              />
              <span
                className={`mt-2 text-sm font-medium transition-colors whitespace-nowrap ${isActive || isCompleted ? "text-fixed-primary" : "text-fixed-tertiary"}`}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`h-px w-8 mx-2 -mt-5 transition-colors ${lineColor}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
