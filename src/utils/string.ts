/**
 * Trunca una dirección mostrando los primeros 4 y últimos 4 caracteres
 * @param address Dirección completa
 * @param chars Número de caracteres a mostrar al inicio y final (default: 4)
 * @returns Dirección truncada (ej: "0x1234...5678")
 */
export function truncateAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  if (address.length < chars * 2) return address;
  
  const start = address.slice(0, chars);
  const end = address.slice(-chars);
  
  return `${start}...${end}`;
}

/**
 * Capitaliza la primera letra de un string
 * @param str String a capitalizar
 * @returns String con la primera letra en mayúscula
 */
export function capitalizeFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Formatea un número como moneda
 * @param value Número a formatear
 * @param currency Símbolo de la moneda (default: '$')
 * @param decimals Decimales a mostrar (default: 2)
 * @returns String formateado (ej: "$1,234.56")
 */
export function formatCurrency(value: number | string, currency: string = '$', decimals: number = 2): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return `${currency}0`;
  
  return `${currency}${num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}`;
}

/**
 * Formatea un timestamp a una fecha legible
 * @param timestamp Timestamp en milisegundos o segundos
 * @returns Fecha formateada (ej: "Jun 16 21:48:35")
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * (timestamp < 1e12 ? 1000 : 1));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${month} ${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Elimina los espacios extras de un string
 * @param str String a limpiar
 * @returns String sin espacios extras
 */
export function cleanSpaces(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Verifica si un string es una dirección ethereum válida
 * @param address Dirección a verificar
 * @returns boolean
 */
export function isValidEthAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Formatea un número con el sufijo K, M, B, etc.
 * @param num Número a formatear
 * @returns String formateado (ej: "1.2K", "3.4M")
 */
export function formatCompactNumber(num: number): string {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
  const suffix = suffixes[magnitude];
  const scaled = num / Math.pow(10, magnitude * 3);
  
  return magnitude > 0 
    ? `${scaled.toFixed(1)}${suffix}`
    : num.toString();
}

/**
 * Formatea un porcentaje
 * @param value Número a formatear
 * @param decimals Decimales a mostrar (default: 2)
 * @returns String formateado (ej: "+12.34%", "-5.67%")
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Trunca una URL para mostrarla de forma más legible
 * @param url URL completa a truncar
 * @returns URL truncada manteniendo el dominio y parte del path
 * 
 * @example
 * URLs simples
 * truncateUrl('https://twitter.com/user123') // → 'twitter.com/user123'
 * truncateUrl('https://discord.gg/very-long-invitation-code') // → 'discord.gg/very-long-...'
 * 
 * URLs con paths largos
 * truncateUrl('https://github.com/organization/repository/pulls/123') 
 * → 'github.com/organizat...'
 * 
 * URLs inválidas o strings normales
 * truncateUrl('Invalid URL String That Is Very Long') 
 * → 'Invalid URL String That Is Very Long'
 */
export function truncateUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname === '/' ? '' : urlObj.pathname;
    return `${urlObj.hostname}${path.slice(0, 15)}${path.length > 15 ? '...' : ''}`;
  } catch {
    // Si no es una URL válida, trunca el string normalmente
    return url.length > 30 ? url.slice(0, 30) + '...' : url;
  }
}