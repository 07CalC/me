import { getAllPost, Post } from '../../lib/blog';
import Link from 'next/link';
import { BackButton } from './backButton';


export const metadata = {
  title: 'Blog | Vinayak',
  description: 'Blog posts about my experiences, insights, and thoughts on various topics.',
}

export default async function BlogPage() {
  const posts = getAllPost(); return (
    <section className="mx-auto py-8">
      <div className="mb-8 flex items-center justify-center">
        <BackButton />
        <h1 className="text-3xl font-bold mt-6 text-center text-accent">Blog</h1>
      </div>
      <p className="text-center text-text text-sm sm:text-lg mb-8">
        Here you might find some interesting experiences and insights.
        Expect one new post every 2 sunday, no promises though!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {posts.map((post: Post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="relative border-2 bg-accent2/20 pb-8 border-accent2 flex flex-col gap-y-3 rounded-lg hover:shadow-lg transition-shadow"
          >
            {post.meta.image && (
              <img
                src={post.meta.image}
                alt={post.meta.title}
                className="w-full rounded-lg"
              />
            )}

            <h3 className="text-xl px-2 font-semibold text-accent hover:underline">
              {post.meta.title}
            </h3>

            <p className="text-pink text-sm px-2">
              {post.meta.description}
            </p>

            <span className="absolute bottom-2 right-2 text-sm bg-accent/30 text-text px-2 py-0.5 rounded">
              {new Date(post.meta.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
