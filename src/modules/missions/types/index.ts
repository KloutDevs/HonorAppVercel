/* import type { Rank } from "@/types/rank";

// Tipo base para una misión
export interface Mission {
    id: string;
    rank_id: {
        _id: string;
        name: string;
    };
    title: string;
    detail: string;
    form_type: 'rich_text' | 'image' | 'video';
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Tipo para la respuesta de la API al listar misiones
export interface MissionsResponse {
    missions: Mission[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

// Tipo para la respuesta de misiones por rango
export interface MissionsByRankResponse {
    missions: Mission[];
}

// Tipo para crear una nueva misión
export interface CreateMissionRequest {
  rank_id: string;
  title: string;
  detail: string;
  form_type: 'rich_text' | 'image' | 'video';
  order: number;
  is_active?: boolean;
}

// Tipo para actualizar una misión
export interface UpdateMissionRequest {
  rank_id?: string;
  title?: string;
  detail?: string;
  form_type?: 'rich_text' | 'image' | 'video';
  order?: number;
  is_active?: boolean;
}

// Tipo para los valores del formulario
export interface MissionFormValues {
  rank_id: string;
  title: string;
  detail: string;
  form_type: 'rich_text' | 'image' | 'video';
  order: number;
  is_active: boolean;
} */