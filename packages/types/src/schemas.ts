import { z } from "zod";
import {
  TRANSACTION_TYPE,
  PIX_KEY_TYPE,
  ACCOUNT_TYPE,
  CURRENCY,
} from "./constants";

export const pixKeyTypeSchema = z.enum([
  PIX_KEY_TYPE.EMAIL,
  PIX_KEY_TYPE.PHONE,
  PIX_KEY_TYPE.CPF,
  PIX_KEY_TYPE.CNPJ,
  PIX_KEY_TYPE.RANDOM,
]);

export const accountTypeSchema = z.enum([
  ACCOUNT_TYPE.CORRENTE,
  ACCOUNT_TYPE.POUPANCA,
]);

export const currencySchema = z.enum([
  CURRENCY.BRL,
  CURRENCY.USD,
  CURRENCY.EUR,
]);

export const transactionTypeSchema = z.enum([
  TRANSACTION_TYPE.PIX,
  TRANSACTION_TYPE.TED,
]);

export const baseTransactionSchema = z.object({
  amount: z
    .number({ error: "errors.amount.required" })
    .positive({ error: "errors.amount.positive" }),
  cpfCnpj: z
    .string({ error: "errors.cpfCnpj.required" })
    .min(1, { error: "errors.cpfCnpj.required" })
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, "");
        return digits.length === 11 || digits.length === 14;
      },
      { message: "errors.cpfCnpj.invalid" }
    ),
  legalName: z
    .string({ error: "errors.legalName.required" })
    .min(1, { error: "errors.legalName.required" }),
  description: z.string().optional(),
  currency: currencySchema,
});

export const createPixTransactionSchema = baseTransactionSchema.extend({
  type: z.literal(TRANSACTION_TYPE.PIX),
  pixKey: z
    .string({ error: "errors.pixKey.required" })
    .min(1, { error: "errors.pixKey.required" }),
  keyType: pixKeyTypeSchema,
});

export const createTedTransactionSchema = baseTransactionSchema.extend({
  type: z.literal(TRANSACTION_TYPE.TED),
  bank: z
    .string({ error: "errors.bank.required" })
    .min(3, { error: "errors.bank.min" }),
  account: z
    .string({ error: "errors.account.required" })
    .min(1, { error: "errors.account.required" }),
  agency: z
    .string({ error: "errors.agency.required" })
    .min(1, { error: "errors.agency.required" }),
  accountType: accountTypeSchema,
});

export const createTransactionSchema = z.discriminatedUnion("type", [
  createPixTransactionSchema,
  createTedTransactionSchema,
]);

export const transactionMethodSchema = z.object({
  type: transactionTypeSchema,
});

export type CreatePixTransactionInput = z.infer<
  typeof createPixTransactionSchema
>;

export type CreateTedTransactionInput = z.infer<
  typeof createTedTransactionSchema
>;

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export type TransactionMethodInput = z.infer<typeof transactionMethodSchema>;

export type PixKeyType = z.infer<typeof pixKeyTypeSchema>;
export type AccountType = z.infer<typeof accountTypeSchema>;
export type Currency = z.infer<typeof currencySchema>;
export type TransactionType = z.infer<typeof transactionTypeSchema>;
