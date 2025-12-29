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
