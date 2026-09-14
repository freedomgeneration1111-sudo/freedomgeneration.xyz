export const publishedJournalPostsQuery = /* groq */ `
  *[
    _type == "journalPost" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current)
  ] | order(date desc, _id asc) {
    _id,
    _updatedAt,
    "slug": slug.current,
    date,
    category,
    author,
    title,
    excerpt,
    body,
    coverMediaId,
    galleryMediaIds,
    facebook
  }
`;
