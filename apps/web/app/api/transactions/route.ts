/**
 * Transactions API Route
 */

import { NextRequest, NextResponse } from "next/server";

import type {
  TransactionFilters,
  CreateTransactionPayload,
  ApiError,
} from "@repo/types/transaction";
import { traceService } from "@/services";

function parseFilters(
  searchParams: URLSearchParams
): Partial<TransactionFilters> {
  return {
    page: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : undefined,
    limit: searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined,
    search: searchParams.get("search") || undefined,
    status: searchParams.get("status") as TransactionFilters["status"],
    currency: searchParams.get("currency") as TransactionFilters["currency"],
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
    type: searchParams.get("type") as TransactionFilters["type"],
  };
}

export async function GET(request: NextRequest) {
  try {
    const data = await traceService.transactions.list(
      parseFilters(request.nextUrl.searchParams)
    );
    return NextResponse.json(data);
  } catch (error) {
    const apiError = error as ApiError;
    return NextResponse.json(apiError, { status: apiError.status || 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateTransactionPayload;
    const data = await traceService.transactions.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const apiError = error as ApiError;
    return NextResponse.json(apiError, { status: apiError.status || 500 });
  }
}
