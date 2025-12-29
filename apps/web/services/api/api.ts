import { toast } from "react-toastify";
import { logger } from "@repo/logger";

import type { ApiError } from "@repo/types/transaction";

const getDefaultHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
});

interface ApiCallConfig {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: HeadersInit;
  showErrorToast?: boolean;
}

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

export async function apiCall<T>({
  endpoint,
  method = "GET",
  body,
  params,
  headers = {},
  showErrorToast = true,
}: ApiCallConfig): Promise<T> {
  const url = `${endpoint}${buildQueryString(params)}`;
  const requestId = crypto.randomUUID();

  logger.debug("API Request", { requestId, endpoint, method });

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...getDefaultHeaders(),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data as ApiError;

      logger.warn("API Error Response", {
        requestId,
        endpoint,
        status: response.status,
      });

      if (showErrorToast) {
        const errorMessage =
          error.errors?.[0]?.message ||
          error.message ||
          "Erro ao processar requisição";
        toast.error(errorMessage);
      }

      throw error;
    }

    logger.debug("API Success", { requestId, endpoint });
    return data as T;
  } catch (error) {
    if ((error as ApiError).status) {
      throw error;
    }

    logger.error("API Network Error", error, { requestId, endpoint });

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
