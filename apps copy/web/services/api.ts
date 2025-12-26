import { toast } from "react-toastify";
import type { ApiError } from "@repo/types/transaction";

/**
 * Configuração base da API
 * Utilizamos variável de ambiente para flexibilidade entre ambientes
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const API_PREFIX = "/api";

/**
 * Headers padrão para todas as requisições
 */
const getDefaultHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
});

/**
 * Interface para configuração de chamadas à API
 */
interface ApiCallConfig<T> {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: HeadersInit;
  showErrorToast?: boolean;
}

/**
 * Converte objeto de parâmetros para query string
 * Remove valores undefined/null
 */
function buildQueryString(
  params?: Record<string, string | number | boolean | undefined>
): string {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Wrapper principal para chamadas à API
 * Centraliza tratamento de erros, headers e parsing de resposta
 */
export async function apiCall<T>({
  endpoint,
  method = "GET",
  body,
  params,
  headers = {},
  showErrorToast = true,
}: ApiCallConfig<T>): Promise<T> {
  const url = `${API_BASE_URL}${API_PREFIX}${endpoint}${buildQueryString(params)}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...getDefaultHeaders(),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Tenta parsear o JSON da resposta
    const data = await response.json();

    if (!response.ok) {
      const error = data as ApiError;

      // Mostra toast de erro se configurado
      if (showErrorToast) {
        const errorMessage =
          error.errors?.[0]?.message ||
          error.message ||
          "Erro ao processar requisição";
        toast.error(errorMessage);
      }

      throw error;
    }

    return data as T;
  } catch (error) {
    // Se já é um ApiError, apenas repassa
    if ((error as ApiError).status) {
      throw error;
    }

    // Erro de rede ou parsing
    const networkError: ApiError = {
      status: 0,
      message: "Erro de conexão. Verifique sua internet.",
    };

    if (showErrorToast) {
      toast.error(networkError.message);
    }

    throw networkError;
  }
}

/**
 * Helpers para métodos HTTP comuns
 */
export const api = {
  get: <T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ) => apiCall<T>({ endpoint, method: "GET", params }),

  post: <T>(endpoint: string, body: unknown) =>
    apiCall<T>({ endpoint, method: "POST", body }),

  put: <T>(endpoint: string, body: unknown) =>
    apiCall<T>({ endpoint, method: "PUT", body }),

  delete: <T>(endpoint: string) => apiCall<T>({ endpoint, method: "DELETE" }),
};
