/**
 * Validates if a string is a valid CPF (11 digits) or CNPJ (14 digits)
 */
export function isValidTaxId(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 || digits.length === 14;
}

/**
 * Checks if the tax ID is a CPF (11 digits)
 */
export function isCpf(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11;
}

/**
 * Checks if the tax ID is a CNPJ (14 digits)
 */
export function isCnpj(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 14;
}

/**
 * Removes all non-digit characters from a tax ID
 */
export function cleanTaxId(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Returns the appropriate mask based on the current value length
 * CPF: 000.000.000-00 (11 digits)
 * CNPJ: 00.000.000/0000-00 (14 digits)
 */
export function getTaxIdMask(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 11) {
    return "000.000.000-00";
  }
  return "00.000.000/0000-00";
}

/**
 * Dynamic mask configuration for CPF/CNPJ input
 * Uses IMask dispatch to switch between masks as user types
 */
export const taxIdMaskOptions = {
  mask: [{ mask: "000.000.000-00" }, { mask: "00.000.000/0000-00" }],
  dispatch: (
    appended: string,
    dynamicMasked: { value: string; compiledMasks: unknown[] }
  ) => {
    const digits = (dynamicMasked.value + appended).replace(/\D/g, "");
    return dynamicMasked.compiledMasks[digits.length > 11 ? 1 : 0];
  },
};
