
import Image from 'next/image';
import type { MDXComponents as MDXComponentType } from 'mdx/types';
import { CopyButton } from './CopyButton';

export const MDXComponents: MDXComponentType = {
  h1: (props) => {
    return (
      <h1
        className="text-3xl font-bold font-mono text-start text-accent2 my-6"
        {...props}
      />
    )
  },
  h2: (props) => (
    <h2
      {...props}
      className="text-2xl font-semibold font-mono text-start text-accent2 my-5"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="text-xl font-semibold font-mono text-start text-accent2 my-4"
    />
  ),
  p: (props) => (
    <p {...props} className="text-lg font-mono text-start my-2 text-text" />
  ),
  H: (props) => (
    <span {...props} className="text-lg font-mono text-start my-2 text-accent" />
  ),
  ul: (props) => (
    <ul {...props} className="list-disc pl-6 text-sm font-mono text-start my-2" />
  ),
  ol: (props) => (
    <ol {...props} className="list-decimal pl-6 text-sm font-mono text-start my-2" />
  ),
  li: (props) => (
    <li {...props} className="text-sm font-mono text-start" />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-4 border-accent/50 pl-4 italic text-sm font-mono text-start my-4"
    />
  ),
  code: (props) => {
    if (!props.className?.includes('language-')) {
      return <code {...props} className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded" />;
    }

    return (
      <div className="relative group">
        <pre className="bg-gray-100 dark:bg-gray-800  rounded-lg overflow-x-auto text-sm">
          <code {...props} />
        </pre>
        <CopyButton
          text={String(props.children)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    );
  },
  pre: (props) => (
    <pre {...props} className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto text-sm font-mono my-4" />
  ),
  img: (props: any) => (
    <div className="flex justify-center my-6">
      <Image
        alt={props.alt}
        src={props.src}
        width={props.width || 800}
        height={props.height || 400}
        className="rounded-lg"
      />
    </div>
  ),
};
