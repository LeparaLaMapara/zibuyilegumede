// src/utils/cloudinary.ts

/**
 * Transforms a standard Cloudinary URL into a high-performance, 
 * auto-formatted, and compressed version.
 */
export const getOptimizedUrl = (url: string) => {
  if (!url) return '';
  return url.replace('/upload/', '/upload/f_auto,q_auto,w_1200/');
};

/**
 * Creates a tiny, blurred placeholder URL for instant "milli-second" loading feel.
 */
export const getPlaceholderUrl = (url: string) => {
  if (!url) return '';
  return url.replace('/upload/', '/upload/f_auto,q_auto,w_50,e_blur:1000/');
};