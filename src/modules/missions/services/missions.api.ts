/* import { apiClient } from '@/lib/apiClient';
import type { ApiResponse } from '@/types';
import type {
    Mission,
    MissionsResponse,
    MissionsByRankResponse,
    CreateMissionRequest,
    UpdateMissionRequest,
} from '../types';
import { debug } from '@/utils/debug';

const COMPONENT = 'MissionsService';

export const missionsApi = {
    getAll: async (params?: {
        page?: number;
        limit?: number;
        rank_id?: string;
        is_active?: boolean;
        form_type?: 'rich_text' | 'image' | 'video';
    }): Promise<ApiResponse<MissionsResponse>> => {
        debug.log(COMPONENT, 'Fetching all missions with params:', params);
        try {
            const response = await apiClient.get<MissionsResponse>('/staff/missions', { params });
            debug.log(COMPONENT, 'Received missions response:', response);
            return response;
        } catch (error) {
            debug.error(COMPONENT, 'Error fetching missions:', error);
            throw error;
        }
    },

    getByRankId: async (rankId: string): Promise<ApiResponse<MissionsByRankResponse>> => {
        debug.log(COMPONENT, `Fetching missions for rank: ${rankId}`);
        try {
            const response = await apiClient.get<MissionsByRankResponse>(`/staff/missions/rank/${rankId}`);
            debug.log(COMPONENT, 'Received missions for rank:', response);
            return response;
        } catch (error) {
            debug.error(COMPONENT, `Error fetching missions for rank ${rankId}:`, error);
            throw error;
        }
    },

    create: async (data: CreateMissionRequest): Promise<ApiResponse<Mission>> => {
        debug.log(COMPONENT, 'Creating mission with data:', data);
        try {
            const response = await apiClient.post<Mission>('/staff/missions', data);
            debug.log(COMPONENT, 'Created mission response:', response);
            return response;
        } catch (error) {
            debug.error(COMPONENT, 'Error creating mission:', error);
            throw error;
        }
    },

    update: async (id: string, data: UpdateMissionRequest): Promise<ApiResponse<Mission>> => {
        debug.log(COMPONENT, `Updating mission ${id} with data:`, data);
        try {
            const response = await apiClient.put<Mission>(`/staff/missions/${id}`, data);
            debug.log(COMPONENT, 'Updated mission response:', response);
            return response;
        } catch (error) {
            debug.error(COMPONENT, `Error updating mission ${id}:`, error);
            throw error;
        }
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
        debug.log(COMPONENT, `Deleting mission ${id}`);
        try {
            const response = await apiClient.delete<void>(`/staff/missions/${id}`);
            debug.log(COMPONENT, 'Deleted mission response:', response);
            return response;
        } catch (error) {
            debug.error(COMPONENT, `Error deleting mission ${id}:`, error);
            throw error;
        }
    },

    reorderByRank: async (rankId: string, missions: { id: string; order: number }[]): Promise<ApiResponse<void>> => {
        debug.log(COMPONENT, `Reordering missions for rank ${rankId}:`, missions);
        try {
            const response = await apiClient.put<void>(`/staff/missions/rank/${rankId}/reorder`, {
                missions
            });
            debug.log(COMPONENT, 'Reordered missions response:', response);
            return response;
        } catch (error) {
            debug.error(COMPONENT, `Error reordering missions for rank ${rankId}:`, error);
            throw error;
        }
    }
}; */