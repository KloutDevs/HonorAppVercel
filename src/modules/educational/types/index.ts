import { z } from 'zod';

// Tipos base comunes
interface BaseMetadata {
  fileSize: number;
}

interface ImageMetadata extends BaseMetadata {
  resolution: string;
  format: string;
}

interface VideoMetadata extends BaseMetadata {
  durationFormatted: string;
  resolution: string;
  format: string;
}

interface PdfMetadata extends BaseMetadata {
  pages: number;
  creationDate: string;
}

interface RankInfo {
  _id: string;
  name: string;
  position: number;
}

// Interfaz base para todos los tipos de contenido
interface BaseEducationalContent {
  _id: string;
  rank_id: RankInfo | string; // Puede ser objeto o string
  title: string;
  description: string;
  media_type: 'video' | 'image' | 'pdf' | 'link';
  url?: string; // Opcional para contenido tipo link
  secure_url: string;
  is_active: boolean;
  metadata?: any; // Metadatos dinámicos según el tipo
  createdAt: string;
  updatedAt: string;
}

// Interfaz para contenido con thumbnail
interface WithThumbnail {
  thumbnail_url: string;
  thumbnail_file_size: number;
  thumbnail_mimetype: string;
}

// Tipos específicos para cada tipo de contenido
interface VideoContent extends BaseEducationalContent {
  media_type: 'video';
  metadata: VideoMetadata;
  thumbnail_url?: string;
  thumbnail_file_size?: number;
  thumbnail_mimetype?: string;
}

interface ImageContent extends BaseEducationalContent {
  media_type: 'image';
  metadata: ImageMetadata;
  thumbnail_url?: string;
  thumbnail_file_size?: number;
  thumbnail_mimetype?: string;
}

interface PdfContent extends BaseEducationalContent {
  media_type: 'pdf';
  metadata: PdfMetadata;
  thumbnail_url?: string;
  thumbnail_file_size?: number;
  thumbnail_mimetype?: string;
}

interface LinkContent extends BaseEducationalContent {
  media_type: 'link';
  thumbnail_url?: string;
  thumbnail_file_size?: number;
  thumbnail_mimetype?: string;
}

// Tipo unión que representa todos los posibles tipos de contenido
export type EducationalContentApiItem = 
  | VideoContent 
  | ImageContent 
  | PdfContent 
  | LinkContent;

// Tipo para la respuesta paginada
export interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
}

export interface EducationalContentResponse {
  content: EducationalContentApiItem[];
  pagination: PaginationInfo;
}

export interface EducationalContentByRankResponse extends Array<EducationalContentApiItem> {}


// Schema de Zod para validación (mantenido por compatibilidad)
export const educationalContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  media_type: z.enum(['video', 'image', 'pdf', 'link']),
  url: z.string().url(),
  rank_id: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type EducationalContent = z.infer<typeof educationalContentSchema>;