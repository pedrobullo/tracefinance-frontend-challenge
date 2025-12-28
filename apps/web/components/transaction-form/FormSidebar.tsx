"use client";

import { Stepper, type StepperStep } from "@repo/ui";
import { Sidebar } from "@/components/Sidebar";

interface Step {
  label: string;
  completed: boolean;
}

interface FormSidebarProps {
  steps: Step[];
  currentStep: number;
}

export function FormSidebar({ steps, currentStep }: FormSidebarProps) {
  const stepperSteps: StepperStep[] = steps.map((step, index) => ({
    id: `step-${index}`,
    label: step.label,
  }));

  return (
    <Sidebar>
      <div className="px-10 pt-8">
        <Stepper
          steps={stepperSteps}
          currentStep={currentStep}
          lineHeight={40}
          testId="transaction-form-stepper"
        />
      </div>
    </Sidebar>
  );
}
