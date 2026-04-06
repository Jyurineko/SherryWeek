export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  url?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  category: Category;
  tags: Tag[];
  readingTime?: number;
  views?: number;
}

export interface BlogPostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  category: Category;
  tags: Tag[];
  readingTime?: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface BlogPostListResponse {
  data: BlogPostListItem[];
  meta: {
    pagination: PaginationMeta;
  };
}