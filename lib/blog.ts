import path from "path";
import fs from "fs";
import matter from "gray-matter"
import { compile } from "@mdx-js/mdx";



const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function getAllPost() {
  const files = fs.readdirSync(BLOG_DIR);

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const fileContent = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug,
      ...data,
    };
  })
}


export async function getPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(fileContent);

  return { slug, meta: data, content: content };
}

