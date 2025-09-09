// Configuration et utilitaires pour l'internationalisation

export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'fr';

// Traductions statiques pour l'interface
export const translations = {
  fr: {
    'blog.title': 'Blog',
    'blog.readMore': 'Lire la suite',
    'blog.readingTime': 'min de lecture',
    'blog.publishedOn': 'Publié le',
    'blog.by': 'par',
    'blog.categories': 'Catégories',
    'blog.tags': 'Tags',
    'blog.relatedPosts': 'Articles similaires',
    'blog.noPostsFound': 'Aucun article trouvé',
    'nav.home': 'Accueil',
    'nav.blog': 'Blog',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'seo.defaultDescription': 'Découvrez nos derniers articles et actualités',
  },
  en: {
    'blog.title': 'Blog',
    'blog.readMore': 'Read more',
    'blog.readingTime': 'min read',
    'blog.publishedOn': 'Published on',
    'blog.by': 'by',
    'blog.categories': 'Categories',
    'blog.tags': 'Tags',
    'blog.relatedPosts': 'Related posts',
    'blog.noPostsFound': 'No posts found',
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'seo.defaultDescription': 'Discover our latest articles and news',
  },
} as const;

// Fonction pour obtenir une traduction
export function t(key: keyof typeof translations.fr, language: Language = defaultLanguage): string {
  return translations[language][key] || translations[defaultLanguage][key] || key;
}

// Fonction pour obtenir la langue depuis l'URL Astro
export function getLanguageFromUrl(url: URL): Language {
  const segments = url.pathname.split('/');
  const langSegment = segments[1];
  
  if (langSegment && langSegment in languages) {
    return langSegment as Language;
  }
  
  return defaultLanguage;
}

// Fonction pour construire une URL localisée
export function getLocalizedPath(path: string, language: Language): string {
  // Si c'est la langue par défaut et qu'on ne préfixe pas, retourner le chemin tel quel
  if (language === defaultLanguage) {
    return path;
  }
  
  // Sinon, préfixer avec la langue
  return `/${language}${path}`;
}

// Fonction pour obtenir l'URL alternative dans une autre langue
export function getAlternateLanguageUrl(currentUrl: URL, targetLanguage: Language): string {
  const currentLang = getLanguageFromUrl(currentUrl);
  let pathname = currentUrl.pathname;
  
  // Supprimer le préfixe de langue actuel s'il existe
  if (currentLang !== defaultLanguage) {
    pathname = pathname.replace(`/${currentLang}`, '') || '/';
  }
  
  // Ajouter le nouveau préfixe de langue
  return getLocalizedPath(pathname, targetLanguage);
}

// Fonction pour formater les dates selon la locale
export function formatDate(date: string | Date, language: Language): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const locales = {
    fr: 'fr-FR',
    en: 'en-US',
  };
  
  return dateObj.toLocaleDateString(locales[language], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
