"use client";

import { useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Typography, Input, Dropdown } from "@repo/ui";
import {
  TRANSACTION_TYPE,
  ACCOUNT_TYPE,
  PIX_KEY_TYPE,
  BANKS,
} from "@repo/types/constants";
import type { TransactionType } from "@repo/types/schemas";
import { useTranslation } from "@/contexts";

import { MaskedInput } from "./MaskedInput";

interface InformationStepProps {
  transactionType: TransactionType;
}

export function InformationStep({ transactionType }: InformationStepProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const isPix = transactionType === TRANSACTION_TYPE.PIX;

  const keyTypeOptions = useMemo(
    () =>
      Object.values(PIX_KEY_TYPE).map((type) => ({
        value: type,
        label: t(`pixKeyType.${type}`),
      })),
    [t]
  );

  const accountTypeOptions = useMemo(
    () =>
      Object.values(ACCOUNT_TYPE).map((type) => ({
        value: type,
        label: t(`accountType.${type}`),
      })),
    [t]
  );

  const bankOptions = useMemo(
    () =>
      BANKS.map((bank) => ({
        value: bank.code,
        label: `${bank.code} - ${bank.name}`,
      })),
    []
  );

  return (
    <div className="flex flex-col gap-8">
      <Typography
        as="h1"
        variant="400-medium"
        color="primary"
        className="text-4xl font-bold"
      >
        {t("transactionForm.informationTitle")}
      </Typography>

      <div className="flex flex-col gap-4">
        <Typography
          variant="100-medium"
          color="primary"
          className="font-semibold"
        >
          {t("transactionForm.transactionInfo")}
        </Typography>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <MaskedInput
              mask={Number}
              placeholder={`${t("transactionForm.amount")} *`}
              value={field.value?.toString() || ""}
              onAccept={(value) =>
                field.onChange(value ? parseFloat(value) : 0)
              }
              error={t(errors.amount?.message as string)}
            />
          )}
        />
        <Controller
          name="cpfCnpj"
          control={control}
          render={({ field }) => (
            <MaskedInput
              mask="000.000.000-00"
              placeholder={`${t("transactionForm.taxId")} *`}
              value={field.value || ""}
              onAccept={(value) => field.onChange(value)}
              error={t(errors.cpfCnpj?.message as string)}
            />
          )}
        />
        <Input
          placeholder={`${t("transactionForm.legalName")} *`}
          error={t(errors.legalName?.message as string)}
          {...register("legalName")}
        />
      </div>

      {isPix ? (
        <div className="flex flex-col gap-4">
          <Typography
            variant="100-medium"
            color="primary"
            className="font-semibold"
          >
            {t("transactionForm.pixDetails")}
          </Typography>
          <Controller
            name="keyType"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={`${t("transactionForm.keyType")} *`}
                options={keyTypeOptions}
                value={field.value}
                onChange={field.onChange}
                error={t(errors.keyType?.message as string)}
              />
            )}
          />
          <Input
            placeholder={`${t("transactionForm.pixKey")} *`}
            error={t(errors.pixKey?.message as string)}
            {...register("pixKey")}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Typography
            variant="100-medium"
            color="primary"
            className="font-semibold"
          >
            {t("transactionForm.bankDetails")}
          </Typography>
          <Controller
            name="accountType"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={`${t("transactionForm.accountType")} *`}
                options={accountTypeOptions}
                value={field.value}
                onChange={field.onChange}
                error={t(errors.accountType?.message as string)}
              />
            )}
          />
          <Controller
            name="bank"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={`${t("transactionForm.bank")} *`}
                options={bankOptions}
                value={field.value}
                onChange={field.onChange}
                error={t(errors.bank?.message as string)}
              />
            )}
          />
          <Input
            placeholder={`${t("transactionForm.account")} *`}
            error={t(errors.account?.message as string)}
            {...register("account")}
          />
          <Input
            placeholder={`${t("transactionForm.agency")} *`}
            error={t(errors.agency?.message as string)}
            {...register("agency")}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Typography
          variant="100-medium"
          color="primary"
          className="font-semibold"
        >
          {t("transactionForm.descriptionSection")}
        </Typography>
        <Typography variant="75-light" color="tertiary">
          {t("transactionForm.descriptionHelper")}
        </Typography>
        <textarea
          {...register("description")}
          placeholder={t("transactionForm.descriptionPlaceholder")}
          className="w-full p-4 rounded-lg bg-level-two border border-border-primary text-primary font-100-light placeholder:text-disable-primary min-h-[100px] resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}
