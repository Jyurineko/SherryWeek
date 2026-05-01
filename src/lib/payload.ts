import type { BlogPost, BlogPostListItem, Category, Tag, Author } from "@/types/blog";
import {
  getAllPosts as getMockPosts,
  getPostBySlug as getMockPostBySlug,
  getPostsByCategory as getMockPostsByCategory,
  getPostsByTag as getMockPostsByTag,
  getAllCategories as getMockCategories,
  getAllTags as getMockTags,
  getCategoryBySlug as getMockCategoryBySlug,
  getTagBySlug as getMockTagBySlug,
} from "./mock-data";

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || "https://jyurineko.website/api";
const USE_MOCK_FALLBACK = true;

interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface PayloadMedia {
  id: string;
  alt?: string;
  url: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}

interface PayloadAuthor {
  id: string;
  name: string;
  avatar?: PayloadMedia | string;
  bio?: string;
  url?: string;
}

interface PayloadCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface PayloadTag {
  id: string;
  name: string;
  slug: string;
}

interface PayloadPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: PayloadMedia | string;
  publishedAt: string;
  updatedAt?: string;
  author: PayloadAuthor | string;
  category: PayloadCategory | string;
  tags: (PayloadTag | string)[];
  readingTime?: number;
  views?: number;
}

async function fetchFromPayload<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${PAYLOAD_API_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Payload API error: ${res.status} ${res.statusText} - ${url}`);
  }

  return res.json();
}

function normalizeMedia(media: PayloadMedia | string | undefined): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return media;
  return media.url;
}

function normalizeAuthor(author: PayloadAuthor | string): Author {
  if (typeof author === "string") {
    return { id: author, name: "Unknown" };
  }
  return {
    id: author.id,
    name: author.name,
    avatar: normalizeMedia(author.avatar as PayloadMedia | string),
    bio: author.bio,
    url: author.url,
  };
}

function normalizeCategory(category: PayloadCategory | string): Category {
  if (typeof category === "string") {
    return { id: category, name: "Unknown", slug: "unknown" };
  }
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
  };
}

function normalizeTag(tag: PayloadTag | string): Tag {
  if (typeof tag === "string") {
    return { id: tag, name: "Unknown", slug: "unknown" };
  }
  return {
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
  };
}

function normalizePost(post: PayloadPost): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content || "",
    coverImage: normalizeMedia(post.coverImage as PayloadMedia | string),
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: normalizeAuthor(post.author),
    category: normalizeCategory(post.category),
    tags: Array.isArray(post.tags) ? post.tags.map(normalizeTag) : [],
    readingTime: post.readingTime,
    views: post.views,
  };
}

function normalizePostListItem(post: PayloadPost): BlogPostListItem {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: normalizeMedia(post.coverImage as PayloadMedia | string),
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: normalizeAuthor(post.author),
    category: normalizeCategory(post.category),
    tags: Array.isArray(post.tags) ? post.tags.map(normalizeTag) : [],
    readingTime: post.readingTime,
  };
}

export async function getAllPosts(): Promise<BlogPostListItem[]> {
  try {
    const data = await fetchFromPayload<PayloadResponse<PayloadPost>>(
      "/posts?depth=2&sort=-publishedAt&limit=100"
    );
    return data.docs.map(normalizePostListItem);
  } catch (error) {
    console.warn("Payload API failed, falling back to mock data:", error);
    if (USE_MOCK_FALLBACK) {
      return getMockPosts();
    }
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await fetchFromPayload<PayloadResponse<PayloadPost>>(
      `/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`
    );
    const post = data.docs[0];
    if (!post) return null;
    return normalizePost(post);
  } catch (error) {
    console.warn("Payload API failed, falling back to mock data:", error);
    if (USE_MOCK_FALLBACK) {
      return getMockPostBySlug(slug) || null;
    }
    return null;
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPostListItem[]> {
  try {
    const data = await fetchFromPayload<PayloadResponse<PayloadPost>>(
      `/posts?where[category.slug][equals]=${encodeURIComponent(categorySlug)}&depth=2&sort=-publishedAt&limit=100`
    );
    return data.docs.map(normalizePostListItem);
  } catch (error) {
    console.warn("Payload API failed, falling back to mock data:", error);
    if (USE_MOCK_FALLBACK) {
      return getMockPostsByCategory(categorySlug);
    }
    return [];
  }
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPostListItem[]> {
  try {
    const data = await fetchFromPayload<PayloadResponse<PayloadPost>>(
      `/posts?where[tags.slug][contains]=${encodeURIComponent(tagSlug)}&depth=2&sort=-publishedAt&limit=100`
    );
    return data.docs.map(normalizePostListItem);
  } catch (error) {
    console.warn("Payload API failed, falling back to mock data:", error);
    if (USE_MOCK_FALLBACK) {
      return getMockPostsByTag(tagSlug);
    }
    return [];
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const data = await fetchFromPayload<PayloadResponse<PayloadCategory>>(
      "/categories?limit=100"
    );
    return data.docs.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
    }));
  } catch (error) {
    console.warn("Payload API failed, falling back to mock data:", error);
    if (USE_MOCK_FALLBACK) {
      return getMockCategories();
    }
    return [];
  }
}

export async function getAllTags(): Promise<Tag[]> {
  try {
    const data = await fetchFromPayload<PayloadResponse<PayloadTag>>(
      "/tags?limit=100"
    );
    return data.docs.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    }));
  } catch (error) {
    console.warn("Payload API failed, falling back to mock data:", error);
    if (USE_MOCK_FALLBACK) {
      return getMockTags();
    }
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const data = await fetchFromPayload<PayloadResponse<PayloadCategory>>(
      `/categories?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
    );
    const cat = data.docs[0];
    if (!cat) return null;
    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
    };
  } catch (error) {
    console.warn("Payload API failed, falling back to mock data:", error);
    if (USE_MOCK_FALLBACK) {
      return getMockCategoryBySlug(slug) || null;
    }
    return null;
  }
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    const data = await fetchFromPayload<PayloadResponse<PayloadTag>>(
      `/tags?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
    );
    const tag = data.docs[0];
    if (!tag) return null;
    return {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    };
  } catch (error) {
    console.warn("Payload API failed, falling back to mock data:", error);
    if (USE_MOCK_FALLBACK) {
      return getMockTagBySlug(slug) || null;
    }
    return null;
  }
}
