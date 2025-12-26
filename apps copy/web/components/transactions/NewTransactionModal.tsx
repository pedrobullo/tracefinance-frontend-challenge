"use client";

import { useCallback } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Modal, Button, Stepper, RadioCard, Input, Select } from "@repo/ui";
import { useTranslation } from "@/contexts/LanguageContext";
import { useTransactionForm } from "@/hooks";
import { useCreateTransaction } from "@/hooks";
import { BANKS, PIX_KEY_TYPE, ACCOUNT_TYPE } from "@repo/types/constants";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { id: "method", label: "Method" },
  { id: "information", label: "Information" },
];

const PIX_KEY_OPTIONS = [
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Telefone" },
  { value: "CPF", label: "CPF" },
  { value: "CNPJ", label: "CNPJ" },
  { value: "RANDOM", label: "Aleatória" },
];

const ACCOUNT_TYPE_OPTIONS = [
  { value: "CORRENTE", label: "Corrente" },
  { value: "POUPANCA", label: "Poupança" },
];

const BANK_OPTIONS = BANKS.map((bank) => ({
  value: bank.code,
  label: `${bank.code} - ${bank.name}`,
}));

export function NewTransactionModal({
  isOpen,
  onClose,
}: NewTransactionModalProps) {
  const { t } = useTranslation();
  const {
    currentStep,
    transactionType,
    step1Form,
    pixForm,
    tedForm,
    goToNextStep,
    goToPreviousStep,
    resetForm,
    getFormData,
  } = useTransactionForm();

  const createTransaction = useCreateTransaction();

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const handleSubmit = useCallback(async () => {
    const formData = getFormData();
    if (!formData) return;

    try {
      await createTransaction.mutateAsync(formData);
      handleClose();
    } catch (error) {
      // Erro já tratado pelo hook
    }
  }, [createTransaction, getFormData, handleClose]);

  const handleNext = useCallback(() => {
    if (currentStep === 0) {
      step1Form.handleSubmit(() => goToNextStep())();
    }
  }, [currentStep, step1Form, goToNextStep]);

  const handleBack = useCallback(() => {
    if (currentStep === 0) {
      handleClose();
    } else {
      goToPreviousStep();
    }
  }, [currentStep, goToPreviousStep, handleClose]);

  const selectedType = step1Form.watch("type");
  const isStep1Valid = !!selectedType;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="full"
      showCloseButton={true}
    >
      <div className="flex h-full">
        {/* Sidebar com stepper */}
        <div className="w-[240px] bg-dark-sidebar p-6 flex flex-col">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <div className="text-primary text-2xl font-bold">
                <span className="text-primary">:</span>
                <span className="text-primary">*</span>
              </div>
              <span className="text-lg font-semibold text-white">
                trace finance
              </span>
            </div>
          </div>

          {/* Stepper */}
          <Stepper
            steps={STEPS.map((step) => ({
              id: step.id,
              label: t.form[step.id as keyof typeof t.form] || step.label,
            }))}
            currentStep={currentStep}
            orientation="vertical"
          />
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col bg-white dark:bg-dark-bg">
          {/* Close button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card text-text-muted"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Conteúdo do step */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-lg">
              {/* Step 1 - Seleção do método */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center text-text-primary dark:text-text-inverse">
                    {t.form.transactionMethod}
                  </h2>

                  <div className="space-y-3">
                    <RadioCard
                      label="TED"
                      checked={selectedType === "TED"}
                      onChange={() => step1Form.setValue("type", "TED")}
                    />
                    <RadioCard
                      label="PIX"
                      checked={selectedType === "PIX"}
                      onChange={() => step1Form.setValue("type", "PIX")}
                    />
                  </div>
                </div>
              )}

              {/* Step 2 - Informações */}
              {currentStep === 1 && transactionType === "PIX" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-center text-text-primary dark:text-text-inverse mb-6">
                    PIX - {t.form.information}
                  </h2>

                  <Input
                    label={t.form.description}
                    placeholder={t.form.descriptionPlaceholder}
                    {...pixForm.register("description")}
                  />

                  <Input
                    label={t.form.amount}
                    placeholder={t.form.amountPlaceholder}
                    type="text"
                    {...pixForm.register("amount", { valueAsNumber: true })}
                    error={pixForm.formState.errors.amount?.message}
                  />

                  <Input
                    label={t.form.cpfCnpj}
                    placeholder={t.form.cpfCnpjPlaceholder}
                    {...pixForm.register("cpfCnpj")}
                    error={pixForm.formState.errors.cpfCnpj?.message}
                  />

                  <Input
                    label={t.form.pixKey}
                    placeholder={t.form.pixKeyPlaceholder}
                    {...pixForm.register("pixKey")}
                    error={pixForm.formState.errors.pixKey?.message}
                  />

                  <Select
                    label={t.form.keyType}
                    placeholder={t.form.selectKeyType}
                    options={PIX_KEY_OPTIONS}
                    {...pixForm.register("keyType")}
                    error={pixForm.formState.errors.keyType?.message}
                  />
                </div>
              )}

              {currentStep === 1 && transactionType === "TED" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-center text-text-primary dark:text-text-inverse mb-6">
                    TED - {t.form.information}
                  </h2>

                  <Input
                    label={t.form.description}
                    placeholder={t.form.descriptionPlaceholder}
                    {...tedForm.register("description")}
                  />

                  <Input
                    label={t.form.amount}
                    placeholder={t.form.amountPlaceholder}
                    type="text"
                    {...tedForm.register("amount", { valueAsNumber: true })}
                    error={tedForm.formState.errors.amount?.message}
                  />

                  <Input
                    label={t.form.cpfCnpj}
                    placeholder={t.form.cpfCnpjPlaceholder}
                    {...tedForm.register("cpfCnpj")}
                    error={tedForm.formState.errors.cpfCnpj?.message}
                  />

                  <Select
                    label={t.form.bank}
                    placeholder={t.form.selectBank}
                    options={BANK_OPTIONS}
                    {...tedForm.register("bank")}
                    error={tedForm.formState.errors.bank?.message}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={t.form.agency}
                      placeholder={t.form.agencyPlaceholder}
                      {...tedForm.register("agency")}
                      error={tedForm.formState.errors.agency?.message}
                    />

                    <Input
                      label={t.form.account}
                      placeholder={t.form.accountPlaceholder}
                      {...tedForm.register("account")}
                      error={tedForm.formState.errors.account?.message}
                    />
                  </div>

                  <Select
                    label={t.form.accountType}
                    placeholder={t.form.selectAccountType}
                    options={ACCOUNT_TYPE_OPTIONS}
                    {...tedForm.register("accountType")}
                    error={tedForm.formState.errors.accountType?.message}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer com botões */}
          <div className="flex items-center justify-between p-6 border-t border-light-border dark:border-dark-border">
            <Button variant="outline" onClick={handleBack}>
              {t.common.cancel}
            </Button>

            {currentStep === 0 ? (
              <Button onClick={handleNext} disabled={!isStep1Valid}>
                {t.common.next}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                isLoading={createTransaction.isPending}
              >
                {t.common.confirm}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
