// Requêtes GROQ pour le contenu multilingue

// Récupérer tous les articles d'une langue spécifique
export const getBlogPostsByLanguage = (language: string) => `
  *[_type == "blogPost" && language == "${language}"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->{name, slug, image},
    categories[]->{title, slug, color},
    publishedAt,
    featured,
    tags,
    readingTime,
    language,
    translations[]->{_id, language, slug}
  }
`;

// Récupérer un article spécifique avec ses traductions
export const getBlogPostWithTranslations = (slug: string, language: string) => `
  *[_type == "blogPost" && slug.current == "${slug}" && language == "${language}"][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->{name, slug, image, bio},
    categories[]->{title, slug, color},
    publishedAt,
    featured,
    tags,
    readingTime,
    body,
    seo,
    language,
    translations[]->{
      _id,
      language,
      slug,
      title
    }
  }
`;

// Récupérer les articles mis en avant par langue
export const getFeaturedPostsByLanguage = (language: string) => `
  *[_type == "blogPost" && language == "${language}" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->{name, slug, image},
    categories[]->{title, slug, color},
    publishedAt,
    readingTime,
    language
  }
`;

// Récupérer les catégories (pas de langue spécifique car elles peuvent être partagées)
export const getCategories = () => `
  *[_type == "category"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    description,
    color,
    icon,
    featured
  }
`;

// Récupérer les articles d'une catégorie spécifique par langue
export const getPostsByCategory = (categorySlug: string, language: string) => `
  *[_type == "blogPost" && language == "${language}" && references(*[_type == "category" && slug.current == "${categorySlug}"]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->{name, slug, image},
    categories[]->{title, slug, color},
    publishedAt,
    readingTime,
    language
  }
`;
