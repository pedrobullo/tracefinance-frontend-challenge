import { NextResponse } from "next/server";

/**
 * URL do backend - variável server-side only (não exposta ao client)
 * Configurar via BACKEND_URL no ambiente de deploy
 */
const BACKEND_URL =
  process.env.BACKEND_URL ||
  "https://fe-challenge-trace-api-production.up.railway.app";

interface BackendFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  params?: URLSearchParams;
  headers?: HeadersInit;
}

/**
 * Utilitário para chamadas ao backend via BFF
 * Centraliza configuração, tratamento de erros e headers
 */
export async function backendFetch(
  endpoint: string,
  options: BackendFetchOptions = {}
): Promise<NextResponse> {
  const { method = "GET", body, params, headers = {} } = options;

  const queryString = params?.toString();
  const url = `${BACKEND_URL}/api${endpoint}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`[BFF] Error fetching ${endpoint}:`, error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
