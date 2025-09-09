import { defineMiddleware } from 'astro:middleware';
import { getLanguageFromUrl } from './lib/i18n';

export const onRequest = defineMiddleware(async (context, next) => {
  // Pour le mode static, on garde le middleware simple
  const response = await next();
  
  // Ajouter les headers de langue pour le SEO
  const currentLang = getLanguageFromUrl(context.url);
  response.headers.set('Content-Language', currentLang);
  
  return response;
});
