import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { TransactionType } from "@repo/types/constants";

/**
 * Schema de validação para Step 1 - Informações Básicas
 */
const step1Schema = z.object({
  type: z.enum(["PIX", "TED"], {
    required_error: "Selecione o tipo de transação",
  }),
});

/**
 * Schema de validação para Step 2 - PIX
 */
const pixSchema = z.object({
  description: z.string().optional(),
  amount: z
    .number({
      required_error: "Valor é obrigatório",
    })
    .min(1, "Valor mínimo é R$ 0,01"),
  cpfCnpj: z
    .string()
    .min(1, "CPF/CNPJ é obrigatório")
    .refine((val) => {
      const cleaned = val.replace(/\D/g, "");
      return cleaned.length === 11 || cleaned.length === 14;
    }, "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos"),
  pixKey: z.string().min(1, "Chave PIX é obrigatória"),
  keyType: z.enum(["EMAIL", "PHONE", "CPF", "CNPJ", "RANDOM"], {
    required_error: "Selecione o tipo de chave",
  }),
});

/**
 * Schema de validação para Step 2 - TED
 */
const tedSchema = z.object({
  description: z.string().optional(),
  amount: z
    .number({
      required_error: "Valor é obrigatório",
    })
    .min(1, "Valor mínimo é R$ 0,01"),
  cpfCnpj: z
    .string()
    .min(1, "CPF/CNPJ é obrigatório")
    .refine((val) => {
      const cleaned = val.replace(/\D/g, "");
      return cleaned.length === 11 || cleaned.length === 14;
    }, "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos"),
  bank: z.string().min(1, "Banco é obrigatório"),
  agency: z.string().min(1, "Agência é obrigatória"),
  account: z.string().min(1, "Conta é obrigatória"),
  accountType: z.enum(["CORRENTE", "POUPANCA"], {
    required_error: "Selecione o tipo de conta",
  }),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type PixFormData = z.infer<typeof pixSchema>;
export type TedFormData = z.infer<typeof tedSchema>;

/**
 * Hook para gerenciar o formulário multi-step de criação de transação
 */
export function useTransactionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);

  // Form do Step 1 - Seleção do tipo
  const step1Form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
  });

  // Form do Step 2 - PIX
  const pixForm = useForm<PixFormData>({
    resolver: zodResolver(pixSchema),
    defaultValues: {
      amount: 0,
    },
  });

  // Form do Step 2 - TED
  const tedForm = useForm<TedFormData>({
    resolver: zodResolver(tedSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const goToNextStep = useCallback(() => {
    if (currentStep === 0) {
      const type = step1Form.getValues("type");
      setTransactionType(type);
    }
    setCurrentStep((prev) => Math.min(prev + 1, 1));
  }, [currentStep, step1Form]);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setTransactionType(null);
    step1Form.reset();
    pixForm.reset();
    tedForm.reset();
  }, [step1Form, pixForm, tedForm]);

  const getFormData = useCallback(() => {
    if (!transactionType) return null;

    if (transactionType === "PIX") {
      const data = pixForm.getValues();
      return {
        type: "PIX" as const,
        ...data,
        cpfCnpj: data.cpfCnpj.replace(/\D/g, ""),
      };
    }

    const data = tedForm.getValues();
    return {
      type: "TED" as const,
      ...data,
      cpfCnpj: data.cpfCnpj.replace(/\D/g, ""),
    };
  }, [transactionType, pixForm, tedForm]);

  return {
    currentStep,
    transactionType,
    step1Form,
    pixForm,
    tedForm,
    goToNextStep,
    goToPreviousStep,
    resetForm,
    getFormData,
    isStep1Valid: step1Form.formState.isValid,
  };
}
