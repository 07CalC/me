import { getAllPost, Post } from '../../lib/blog';
import Link from 'next/link';
import { BackButton } from './backButton';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {posts.map((post: Post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="p-4 border-2 bg-accent2/20 border-accent2 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-accent hover:underline">{post.meta.title}</h3>

            <p className="text-pink text-sm mt-2">{post.meta.description}</p>

            <div className="text-sm text-text mt-2 flex flex-wrap gap-2 items-center">
              <span className="text-xs bg-bg px-2 py-0.5 rounded">
                {new Date(post.meta.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            {post.meta.image && (
              <img
                src={post.meta.image}
                alt={post.meta.title}
                className="mt-4 w-full rounded-lg"
              />
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
