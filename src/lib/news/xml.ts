const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

export function decodeEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, name) => ENTITIES[name] ?? "");
}

export function stripCdata(input: string): string {
  const match = input.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return match ? match[1] : input;
}

export function stripHtml(input: string): string {
  return decodeEntities(input.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

/** Extract all `<tagName ...>...</tagName>` blocks, including self-closing-free content blocks. */
export function extractBlocks(xml: string, tagName: string): string[] {
  const re = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "gi");
  const blocks: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) {
    blocks.push(m[1]);
  }
  return blocks;
}

/** Extract the text content of the first matching tag from a list of candidate tag names. */
export function extractText(block: string, tagNames: string[]): string | undefined {
  for (const tag of tagNames) {
    const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i");
    const m = block.match(re);
    if (m) {
      const raw = stripCdata(m[1].trim());
      const cleaned = stripHtml(raw);
      if (cleaned) return cleaned;
    }
  }
  return undefined;
}

/** RSS <link>text</link>, or Atom <link href="..." /> (preferring rel="alternate" if present). */
export function extractLink(block: string): string | undefined {
  const atomLinks = [...block.matchAll(/<link\b([^>]*)\/?>/gi)];
  if (atomLinks.length > 0) {
    const alternate = atomLinks.find((m) => /rel=["']alternate["']/i.test(m[1]));
    const chosen = alternate ?? atomLinks[0];
    const hrefMatch = chosen[1].match(/href=["']([^"']+)["']/i);
    if (hrefMatch) return decodeEntities(hrefMatch[1]);
  }
  const textLink = block.match(/<link(?:\s[^>]*)?>([\s\S]*?)<\/link>/i);
  if (textLink && textLink[1].trim()) return decodeEntities(stripCdata(textLink[1].trim()));
  return undefined;
}

/**
 * WordPress media URLs commonly end in a generated crop size, e.g.
 * `banner-e12345-150x150.jpg`. The un-cropped original usually lives at the same
 * path with that suffix removed — worth trying for a sharper image than the tiny
 * thumbnail feeds tend to enclose.
 */
export function upgradeWordPressThumbnail(url: string): string {
  return url.replace(/-\d{2,4}x\d{2,4}(\.(?:jpg|jpeg|png|gif|webp))(\?.*)?$/i, "$1$2");
}

/** First image URL found via <enclosure>, <media:content>, <media:thumbnail>, or an <img> in content. */
export function extractImage(block: string): string | undefined {
  const enclosure = block.match(/<enclosure\b([^>]*)\/?>/i);
  if (enclosure) {
    const url = enclosure[1].match(/url=["']([^"']+)["']/i);
    const type = enclosure[1].match(/type=["']([^"']+)["']/i);
    if (url && (!type || /^image\//i.test(type[1]))) return upgradeWordPressThumbnail(decodeEntities(url[1]));
  }
  const media = block.match(/<media:(?:content|thumbnail)\b([^>]*)\/?>/i);
  if (media) {
    const url = media[1].match(/url=["']([^"']+)["']/i);
    if (url) return upgradeWordPressThumbnail(decodeEntities(url[1]));
  }
  // <content type="html"> often stores markup HTML-entity-escaped (&lt;img ...&gt;),
  // so decode the block before looking for an <img> tag inside it.
  const img = decodeEntities(block).match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
  if (img) return upgradeWordPressThumbnail(img[1]);
  return undefined;
}

export function parseDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const t = Date.parse(value.trim());
  return Number.isNaN(t) ? undefined : new Date(t).toISOString();
}
