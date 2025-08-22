import { z } from 'zod';
import type { AxiosError } from 'axios';

export interface RankErrorResponse {
  success: false;
  message: string;
}

export const isRankError = (error: unknown): error is AxiosError<RankErrorResponse> => {
  if (!error || typeof error !== 'object') return false;
  
  const axiosError = error as AxiosError<RankErrorResponse>;
  return !!(
    axiosError.response &&
    axiosError.response.data &&
    'success' in axiosError.response.data &&
    axiosError.response.data.success === false &&
    'message' in axiosError.response.data &&
    typeof axiosError.response.data.message === 'string'
  );
};

export interface PaginationData {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
}

export interface RanksResponseData {
  ranks: Array<{
    _id: string;
    name: string;
    position: number;
    cost: {
      $numberDecimal: string;
    };
    monthly_fee: {
      $numberDecimal: string;
    };
    earning_goal: {
      $numberDecimal: string;
    };
    global_earnings_pool: {
      $numberDecimal: string;
    };
    mission_ids: string[];
    content_ids: string[];
  }>;
  pagination: PaginationData;
}

export interface CreateRankRequest {
  name: string;
  position: number;
  cost: string;
  monthly_fee: string;
  earning_goal: string;
  global_earnings_pool: string;
  mission_ids: string[];
  content_ids: string[];
}

export interface UpdateRankRequest {
  name?: string;
  position?: number;
  cost?: string;
  monthly_fee?: string;
  earning_goal?: string;
  global_earnings_pool?: string;
}

export const rankFormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  position: z.number().min(1, 'La posición debe ser mayor a 0'),
  cost: z.number().min(0, 'El costo no puede ser negativo'),
  monthly_fee: z.number().min(0, 'La cuota mensual no puede ser negativa'),
  earning_goal: z.number().min(0, 'La meta de ganancias no puede ser negativa'),
  global_earnings_pool: z.number()
    .min(0, 'El pool global no puede ser negativo')
    .max(100, 'El pool global no puede ser mayor a 100')
});

export type RankFormValues = z.infer<typeof rankFormSchema>;