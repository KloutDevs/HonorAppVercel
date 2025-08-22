export function getMimeTypeFromExtension(extension: string): string {
  if (extension.startsWith('.')) {
    extension = extension.substring(1);
  }
  
  const mimeTypes: Record<string, string> = {
    // Imágenes
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'bmp': 'image/bmp',
    'tiff': 'image/tiff',
    'tif': 'image/tiff',
    'ico': 'image/vnd.microsoft.icon',
    'avif': 'image/avif',
    'apng': 'image/apng',
    
    // Videos
    'mp4': 'video/mp4',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    'wmv': 'video/x-ms-wmv',
    'flv': 'video/x-flv',
    'webm': 'video/webm',
    'mkv': 'video/x-matroska',
    'mpeg': 'video/mpeg',
    'mpg': 'video/mpeg',
    '3gp': 'video/3gpp',
    'ogv': 'video/ogg',
    
    // Audio
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'aac': 'audio/aac',
    'flac': 'audio/flac',
    'wma': 'audio/x-ms-wma',
    'opus': 'audio/opus',
    
    // Documentos
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  };
  
  return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
}

// Función para extraer la extensión de una URL
export function getFileExtensionFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const lastDotIndex = pathname.lastIndexOf('.');
    
    if (lastDotIndex === -1) {
      return '';
    }
    
    return pathname.substring(lastDotIndex + 1).toLowerCase();
  } catch {
    // Si la URL no es válida, intentar extraer la extensión directamente
    const lastDotIndex = url.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return '';
    }
    
    const extension = url.substring(lastDotIndex + 1);
    // Remover parámetros de query si existen
    return extension.split('?')[0].split('#')[0].toLowerCase();
  }
}

// Función para detectar si una URL es de video
export function isVideoUrl(url: string): boolean {
  const extension = getFileExtensionFromUrl(url);
  const mimeType = getMimeTypeFromExtension(extension);
  return mimeType.startsWith('video/');
}

// Función para detectar si una URL es de imagen
export function isImageUrl(url: string): boolean {
  const extension = getFileExtensionFromUrl(url);
  const mimeType = getMimeTypeFromExtension(extension);
  return mimeType.startsWith('image/');
}

// Función para detectar si una URL es de audio
export function isAudioUrl(url: string): boolean {
  const extension = getFileExtensionFromUrl(url);
  const mimeType = getMimeTypeFromExtension(extension);
  return mimeType.startsWith('audio/');
}

// Función para detectar si una URL es de PDF
export function isPdfUrl(url: string): boolean {
  const extension = getFileExtensionFromUrl(url);
  const mimeType = getMimeTypeFromExtension(extension);
  return mimeType === 'application/pdf';
}

// Función principal para detectar el tipo de contenido
export function detectContentType(url: string): 'video' | 'image' | 'audio' | 'pdf' | 'link' {
  if (isVideoUrl(url)) return 'video';
  if (isImageUrl(url)) return 'image';
  if (isAudioUrl(url)) return 'audio';
  if (isPdfUrl(url)) return 'pdf';
  return 'link';
}