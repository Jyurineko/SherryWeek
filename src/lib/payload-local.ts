import { getPayload } from 'payload'
import config from '@payload-config'
import type { BlogPost, BlogPostListItem, Category, Tag } from '@/types/blog'

async function getPayloadClient() {
  return getPayload({ config })
}

function normalizePost(post: any): BlogPost {
  return {
    id: String(post.id),
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: typeof post.content === 'string' ? post.content : JSON.stringify(post.content),
    coverImage: typeof post.coverImage === 'object' ? post.coverImage?.url : post.coverImage,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: {
      id: String(typeof post.author === 'object' ? post.author?.id : post.author),
      name: typeof post.author === 'object' ? post.author?.name || 'Unknown' : 'Unknown',
      avatar: typeof post.author === 'object' && post.author?.avatar
        ? (typeof post.author.avatar === 'object' ? post.author.avatar.url : post.author.avatar)
        : undefined,
      bio: typeof post.author === 'object' ? post.author?.bio : undefined,
      url: typeof post.author === 'object' ? post.author?.url : undefined,
    },
    category: {
      id: String(typeof post.category === 'object' ? post.category?.id : post.category),
      name: typeof post.category === 'object' ? post.category?.name || 'Unknown' : 'Unknown',
      slug: typeof post.category === 'object' ? post.category?.slug || 'unknown' : 'unknown',
      description: typeof post.category === 'object' ? post.category?.description : undefined,
    },
    tags: Array.isArray(post.tags)
      ? post.tags.map((tag: any) => ({
          id: String(typeof tag === 'object' ? tag?.id : tag),
          name: typeof tag === 'object' ? tag?.name || 'Unknown' : 'Unknown',
          slug: typeof tag === 'object' ? tag?.slug || 'unknown' : 'unknown',
        }))
      : [],
    readingTime: post.readingTime,
    views: post.views,
  }
}

function normalizePostListItem(post: any): BlogPostListItem {
  const normalized = normalizePost(post)
  return {
    id: normalized.id,
    title: normalized.title,
    slug: normalized.slug,
    excerpt: normalized.excerpt,
    coverImage: normalized.coverImage,
    publishedAt: normalized.publishedAt,
    updatedAt: normalized.updatedAt,
    author: normalized.author,
    category: normalized.category,
    tags: normalized.tags,
    readingTime: normalized.readingTime,
  }
}

export async function getAllPosts(): Promise<BlogPostListItem[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      depth: 2,
      sort: '-publishedAt',
      limit: 100,
      where: {
        status: {
          equals: 'published',
        },
      },
    })
    return result.docs.map(normalizePostListItem)
  } catch (error) {
    console.error('Failed to fetch posts via Local API:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    const post = result.docs[0]
    if (!post) return null
    return normalizePost(post)
  } catch (error) {
    console.error('Failed to fetch post by slug via Local API:', error)
    return null
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPostListItem[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      depth: 2,
      sort: '-publishedAt',
      limit: 100,
      where: {
        and: [
          {
            status: {
              equals: 'published',
            },
          },
          {
            'category.slug': {
              equals: categorySlug,
            },
          },
        ],
      },
    })
    return result.docs.map(normalizePostListItem)
  } catch (error) {
    console.error('Failed to fetch posts by category via Local API:', error)
    return []
  }
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPostListItem[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      depth: 2,
      sort: '-publishedAt',
      limit: 100,
      where: {
        and: [
          {
            status: {
              equals: 'published',
            },
          },
          {
            'tags.slug': {
              equals: tagSlug,
            },
          },
        ],
      },
    })
    return result.docs.map(normalizePostListItem)
  } catch (error) {
    console.error('Failed to fetch posts by tag via Local API:', error)
    return []
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'categories',
      limit: 100,
    })
    return result.docs.map((cat: any) => ({
      id: String(cat.id),
      name: cat.name,
      slug: cat.slug,
      description: cat.description || undefined,
    }))
  } catch (error) {
    console.error('Failed to fetch categories via Local API:', error)
    return []
  }
}

export async function getAllTags(): Promise<Tag[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'tags',
      limit: 100,
    })
    return result.docs.map((tag: any) => ({
      id: String(tag.id),
      name: tag.name,
      slug: tag.slug,
    }))
  } catch (error) {
    console.error('Failed to fetch tags via Local API:', error)
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'categories',
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    const cat = result.docs[0]
    if (!cat) return null
    return {
      id: String(cat.id),
      name: cat.name,
      slug: cat.slug,
      description: cat.description || undefined,
    }
  } catch (error) {
    console.error('Failed to fetch category by slug via Local API:', error)
    return null
  }
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'tags',
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    const tag = result.docs[0]
    if (!tag) return null
    return {
      id: String(tag.id),
      name: tag.name,
      slug: tag.slug,
    }
  } catch (error) {
    console.error('Failed to fetch tag by slug via Local API:', error)
    return null
  }
}

// Header
export interface HeaderData {
  logo?: string
  siteTitle: string
  tagline?: string
  navItems: Array<{
    label: string
    link: string
    newTab: boolean
  }>
  socialLinks: Array<{
    platform: string
    url: string
    icon?: string
  }>
}

export async function getHeader(): Promise<HeaderData | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.findGlobal({
      slug: 'header',
    })
    if (!result) return null
    return {
      logo: typeof result.logo === 'object' ? String(result.logo?.url || '') || undefined : String(result.logo || '') || undefined,
      siteTitle: result.siteTitle || '赛博莉莉丝',
      tagline: result.tagline || undefined,
      navItems: Array.isArray(result.navItems)
        ? result.navItems.map((item: any) => ({
            label: item.label,
            link: item.link,
            newTab: item.newTab || false,
          }))
        : [],
      socialLinks: Array.isArray(result.socialLinks)
        ? result.socialLinks.map((link: any) => ({
            platform: link.platform,
            url: link.url,
            icon: typeof link.icon === 'object' ? link.icon?.url : link.icon,
          }))
        : [],
    }
  } catch (error) {
    console.error('Failed to fetch header:', error)
    return null
  }
}

// Footer
export interface FooterData {
  copyright: string
  icp?: string
  links: Array<{
    label: string
    url: string
  }>
  showPoweredBy: boolean
}

export async function getFooter(): Promise<FooterData | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.findGlobal({
      slug: 'footer',
    })
    if (!result) return null
    return {
      copyright: result.copyright || '© 2026 赛博莉莉丝. All rights reserved.',
      icp: result.icp || undefined,
      links: Array.isArray(result.links)
        ? result.links.map((link: any) => ({
            label: link.label,
            url: link.url,
          }))
        : [],
      showPoweredBy: result.showPoweredBy !== false,
    }
  } catch (error) {
    console.error('Failed to fetch footer:', error)
    return null
  }
}
