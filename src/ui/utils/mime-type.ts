export const MIME_TYPES = {
  'video/mp4': { ext: 'mp4', mimeType: 'video/mp4', name: 'MP4' },
  'video/webm': { ext: 'webm', mimeType: 'video/webm', name: 'WebM' },
} as const;

export type MimeType = keyof typeof MIME_TYPES;
