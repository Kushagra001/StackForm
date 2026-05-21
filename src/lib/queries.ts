export const PROJECTS_QUERY = `
  *[_type == "project"] | order(order asc) {
    _id, title, slug, client, type, tagline,
    coverImage, tags, accentColor, liveUrl,
    featured, order
  }
`;

export const PROJECT_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, client, type, tagline,
    coverImage, tags, accentColor, liveUrl,
    overview, challenge, solution, results, images
  }
`;

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(order asc) {
    _id, title, slug, client, type, tagline,
    coverImage, tags, accentColor
  }
`;
