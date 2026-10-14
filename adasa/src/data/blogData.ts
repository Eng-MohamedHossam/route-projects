import postsData from "./posts.json"

// Destructure categories, posts, and site info from the imported JSON
export const categories: string[] = postsData.categories?.map((category) => category.name) || [
  "جميع المقالات",
  "إضاءة",
  "بورتريه",
  "مناظر طبيعية",
  "تقنيات",
  "معدات",
]

export const allPosts = postsData.posts || []
export const siteInfo = postsData.siteInfo || {}
