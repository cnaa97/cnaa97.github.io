import React from 'react';
import Content from '@theme-original/BlogPostItem/Content';
import type ContentType from '@theme/BlogPostItem/Content';
import type {WrapperProps} from '@docusaurus/types';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import FbComment from '@site/src/components/FbComment';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): JSX.Element {
  const { isBlogPostPage, metadata } = useBlogPost();
  return (
    <>
      <Content {...props} />
      {isBlogPostPage && metadata?.permalink && <FbComment pathname={metadata?.permalink} className="mt-8" />}
    </>
  );
}
