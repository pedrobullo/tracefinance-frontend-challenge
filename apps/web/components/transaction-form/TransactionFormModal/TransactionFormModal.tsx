"use client";

import { useState, useCallback } from "react";
import { Activity } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Modal, Button, Stepper, type StepperStep } from "@repo/ui";
import {
  createTransactionSchema,
  type CreateTransactionInput,
} from "@repo/types/schemas";

import { useTranslation } from "@/contexts";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { useMediaQuery } from "@/hooks";

import { MethodStep } from "../MethodStep/MethodStep";
import { InformationStep } from "../InformationStep/InformationStep";

export interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTransactionInput) => Promise<void>;
}

type FormStep = "method" | "information";

const STEPS: FormStep[] = ["method", "information"];

export function TransactionFormModal({
  isOpen,
  onClose,
  onSubmit,
}: TransactionFormModalProps) {
  const { t } = useTranslation();

  const isDesktop = useMediaQuery("(min-width: 640px)");

  const [currentStep, setCurrentStep] = useState<FormStep>("method");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      currency: "BRL",
    },
  });

  const { handleSubmit, trigger, watch } = methods;
  const selectedType = watch("type");

  const handleNext = useCallback(async () => {
    if (currentStep === "method") {
      const isValid = await trigger("type");
      if (isValid) {
        setCurrentStep("information");
      }
    }
  }, [currentStep, trigger]);

  const handleBack = useCallback(() => {
    if (currentStep === "information") {
      setCurrentStep("method");
    }
  }, [currentStep]);

  const handleFormSubmit = useCallback(
    async (data: CreateTransactionInput) => {
      setIsSubmitting(true);
      try {
        await onSubmit(data);
        methods.reset();
        setCurrentStep("method");
        onClose();
      } catch (error) {
        console.error("Failed to submit transaction:", error);
        methods.reset();
        setCurrentStep("method");
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, onClose, methods]
  );

  const handleClose = useCallback(() => {
    methods.reset();
    setCurrentStep("method");
    onClose();
  }, [methods, onClose]);

  const currentStepIndex = STEPS.indexOf(currentStep);

  const stepperSteps: StepperStep[] = [
    { id: "method", label: t("transactionForm.steps.method") },
    { id: "information", label: t("transactionForm.steps.information") },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="full"
      showCloseButton={false}
      closeOnOverlayClick={false}
      testId="transaction-form-modal"
    >
      <div className={`flex h-full ${isDesktop ? "flex-row" : "flex-col"}`}>
        <Sidebar orientation={isDesktop ? "vertical" : "horizontal"}>
          <div className={isDesktop ? "px-10 pt-8" : "flex-1"}>
            <Stepper
              steps={stepperSteps}
              currentStep={currentStepIndex}
              orientation={isDesktop ? "vertical" : "horizontal"}
              lineHeight={40}
              testId="transaction-form-stepper"
            />
          </div>
        </Sidebar>
        <div className="flex-1 flex flex-col bg-level-one relative overflow-auto">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-9 right-8 p-2 rounded-lg hover:bg-level-three transition-colors z-10"
            data-testid="transaction-form-close-button"
          >
            <XMarkIcon className="w-6 h-6 text-primary" />
          </button>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex-1 flex flex-col items-center px-8 pt-24"
              data-testid="transaction-form"
            >
              <div className="w-full max-w-[581px]">
                <Activity
                  mode={currentStep === "method" ? "visible" : "hidden"}
                >
                  <MethodStep />
                  <div className="flex justify-between mt-10 gap-10">
                    <Button
                      type="button"
                      hierarchy="secondary"
                      size="large"
                      onClick={handleClose}
                    >
                      {t("transactionForm.cancel")}
                    </Button>
                    <Button
                      type="button"
                      hierarchy="primary"
                      size="large"
                      onClick={handleNext}
                      disabled={!selectedType}
                    >
                      {t("transactionForm.next")}
                    </Button>
                  </div>
                </Activity>
                <Activity
                  mode={currentStep === "information" ? "visible" : "hidden"}
                >
                  <InformationStep />
                  <div className="flex justify-between mt-10 gap-10">
                    <Button
                      type="button"
                      hierarchy="secondary"
                      size="large"
                      onClick={handleBack}
                    >
                      {t("transactionForm.back")}
                    </Button>
                    <Button
                      type="submit"
                      hierarchy="primary"
                      size="large"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? t("transactionForm.sending")
                        : t("transactionForm.send")}
                    </Button>
                  </div>
                </Activity>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Modal>
  );
}
