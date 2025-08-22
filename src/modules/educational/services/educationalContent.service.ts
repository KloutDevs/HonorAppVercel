import { apiClient } from '@/lib/apiClient';
import type { ApiResponse } from '@/types/api';
import type { EducationalContentApiItem, EducationalContentByRankResponse, EducationalContentResponse } from '../types';
import { debug } from '@/utils/debug';

const COMPONENT = 'EducationalContentService';

const educationalContentService = {
  getAll: async (params: {
    page?: number;
    limit?: number;
    rank_id?: string;
    media_type?: string;
  }): Promise<ApiResponse<EducationalContentResponse>> => {
    debug.log(COMPONENT, 'Fetching all educational content with params:', params);
    try {
      const response = await apiClient.get<EducationalContentResponse>('/staff/educational-content', params);
      debug.log(COMPONENT, 'Received educational content response:', response);
      return response;
    } catch (error) {
      debug.error(COMPONENT, 'Error fetching educational content:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<ApiResponse<EducationalContentApiItem>> => {
    debug.log(COMPONENT, `Fetching educational content with id: ${id}`);
    try {
      const response = await apiClient.get<EducationalContentApiItem>(`/staff/educational-content/${id}`);
      debug.log(COMPONENT, 'Received educational content by id response:', response);
      return response;
    } catch (error) {
      debug.error(COMPONENT, `Error fetching educational content with id ${id}:`, error);
      throw error;
    }
  },

  getByRankId: async (rankId: string): Promise<ApiResponse<EducationalContentByRankResponse>> => {
    debug.log(COMPONENT, `Fetching educational content for rank: ${rankId}`);
    try {
      const response = await apiClient.get<EducationalContentByRankResponse>(
        `/staff/educational-content/rank/${rankId}`
      );
      debug.log(COMPONENT, 'Received educational content for rank:', response);
      return response;
    } catch (error) {
      debug.error(COMPONENT, `Error fetching educational content for rank ${rankId}:`, error);
      throw error;
    }
  },

  create: async (data: FormData): Promise<ApiResponse<EducationalContentApiItem>> => {
    debug.log(COMPONENT, 'Creating educational content');
    debug.log(COMPONENT, 'FormData contents:');
    const formDataObject: Record<string, any> = {};
    const files: Array<{ key: string; name: string; type: string; size: number }> = [];

    for (const [key, value] of data.entries()) {
      if (value instanceof File) {
        files.push({
          key,
          name: value.name,
          type: value.type,
          size: value.size
        });
        debug.log(COMPONENT, `${key}: File(${value.name}, ${value.type}, ${value.size} bytes)`);
      } else {
        formDataObject[key] = value;
        debug.log(COMPONENT, `${key}: ${value}`);
      }
    }

    debug.log(COMPONENT, 'Sending request to server with data:', {
      formFields: formDataObject,
      files: files,
      totalFiles: files.length,
      formDataKeys: Array.from(data.keys())
    });

    try {
      const response = await apiClient.post<EducationalContentApiItem>('/staff/educational-content', data);
      debug.log(COMPONENT, 'Created educational content response:', response);
      return response;
    } catch (error) {
      debug.error(COMPONENT, 'Error creating educational content:', error);
      throw error;
    }
  },

  update: async (id: string, data: FormData): Promise<ApiResponse<EducationalContentApiItem>> => {
    debug.log(COMPONENT, `Updating educational content with id: ${id}`);

    debug.log(COMPONENT, 'FormData contents for update:');
    const formDataObject: Record<string, any> = {};
    const files: Array<{ key: string; name: string; type: string; size: number }> = [];

    for (const [key, value] of data.entries()) {
      if (value instanceof File) {
        files.push({
          key,
          name: value.name,
          type: value.type,
          size: value.size
        });
        debug.log(COMPONENT, `${key}: File(${value.name}, ${value.type}, ${value.size} bytes)`);
      } else {
        formDataObject[key] = value;
        debug.log(COMPONENT, `${key}: ${value}`);
      }
    }

    debug.log(COMPONENT, 'Sending PATCH update request to server with data:', {
      formFields: formDataObject,
      files: files,
      totalFiles: files.length,
      formDataKeys: Array.from(data.keys())
    });

    try {
      const response = await apiClient.patch<EducationalContentApiItem>(`/staff/educational-content/${id}`, data);
      debug.log(COMPONENT, 'Updated educational content response:', response);
      return response;
    } catch (error) {
      debug.error(COMPONENT, `Error updating educational content with id ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    debug.log(COMPONENT, `Deleting educational content with id: ${id}`);
    try {
      const response = await apiClient.delete<null>(`/staff/educational-content/${id}`);
      debug.log(COMPONENT, 'Deleted educational content response:', response);
      return response;
    } catch (error) {
      debug.error(COMPONENT, `Error deleting educational content with id ${id}:`, error);
      throw error;
    }
  },
};

export default educationalContentService;