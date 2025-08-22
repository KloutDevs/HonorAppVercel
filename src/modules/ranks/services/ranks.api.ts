import { apiClient } from '@/lib/apiClient';
import type { Rank } from '@/types/rank';
import type { ApiResponse } from '@/types';
import type {
  CreateRankRequest,
  RankFormValues,
  RanksResponseData,
  UpdateRankRequest,
} from '@/modules/ranks/types/types';

// Función auxiliar para transformar la respuesta del backend al formato del frontend
export const transformRank = (rankData: RanksResponseData['ranks'][0]): Rank => ({
  id: rankData._id,
  name: rankData.name,
  position: rankData.position,
  cost: Number(rankData.cost.$numberDecimal),
  monthly_fee: Number(rankData.monthly_fee.$numberDecimal),
  earning_goal: Number(rankData.earning_goal.$numberDecimal),
  global_earnings_pool: Number(rankData.global_earnings_pool.$numberDecimal),
  mission_ids: rankData.mission_ids,
  content_ids: rankData.content_ids,
});

export const ranksApi = {
  getAll: async () => {
    const response = await apiClient.get<RanksResponseData>('/staff/ranks');
    return {
      ranks: response.data.ranks.map(transformRank),
      pagination: response.data.pagination,
    };
  },

  getOne: async (id: string) => {
    const response = await apiClient.get<RanksResponseData['ranks'][0]>(`/staff/ranks/${id}`);
    return transformRank(response.data);
  },

  create: async (data: RankFormValues) => {
    const requestData: CreateRankRequest = {
      ...data,
      cost: data.cost.toString(),
      monthly_fee: data.monthly_fee.toString(),
      earning_goal: data.earning_goal.toString(),
      global_earnings_pool: data.global_earnings_pool.toString(),
      mission_ids: [],
      content_ids: [],
    };

    const response = await apiClient.post<RanksResponseData['ranks'][0]>('/staff/ranks', requestData);
    return transformRank(response.data);
  },

  update: async (id: string, data: Partial<RankFormValues>) => {
    const requestData: UpdateRankRequest = {
      ...data,
      cost: data.cost?.toString(),
      monthly_fee: data.monthly_fee?.toString(),
      earning_goal: data.earning_goal?.toString(),
      global_earnings_pool: data.global_earnings_pool?.toString(),
    };

    const response = await apiClient.put<RanksResponseData['ranks'][0]>(`/staff/ranks/${id}`, requestData);
    return transformRank(response.data);
  },

  updatePositions: async (positions: { id: string; position: number }[]) => {
    const response = await apiClient.patch<void>('/staff/ranks/positions', { positions });
    return response;
  },

  delete: async (id: string) => {
    return await apiClient.delete<void>(`/staff/ranks/${id}`);
  },
};