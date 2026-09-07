import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export type ContentType = "stories" | "loans" | "learn";

export type ContentEntry<Frontmatter> = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
};

function readDir(type: ContentType): string[] {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export function getAllSlugs(type: ContentType): string[] {
  return readDir(type).map((f) => f.replace(/\.mdx$/, ""));
}

export function getEntryBySlug<Frontmatter = Record<string, unknown>>(
  type: ContentType,
  slug: string
): ContentEntry<Frontmatter> {
  const filePath = path.join(CONTENT_ROOT, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as Frontmatter, content };
}

export function getAllEntries<Frontmatter = Record<string, unknown>>(
  type: ContentType
): ContentEntry<Frontmatter>[] {
  return getAllSlugs(type).map((slug) => getEntryBySlug<Frontmatter>(type, slug));
}
