import React from 'react';

import { format } from 'date-fns';
import Link from 'next/link';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { PostItems } from '../utils/Content';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <ul className="flex flex-col w-full gap-4">
      {props.posts.map((item) => (
        <li key={item.slug} className="mb-3 flex flex-col gap-2 group">
          <Link href="/posts/[slug]" as={`/posts/${item.slug}`}>
            <a className="font-bold text-black hover:text-black/50 text-xl md:text-2xl">
              <h2>{item.title}</h2>
            </a>
          </Link>

          <div className="text-sm">
            {format(new Date(item.date), 'LLL d, yyyy')}
          </div>
        </li>
      ))}
    </ul>

    <Pagination
      previous={props.pagination.previous}
      next={props.pagination.next}
    />
  </>
);

export { BlogGallery };
