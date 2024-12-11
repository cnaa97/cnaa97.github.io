import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import FbComment from '../../../components/FbComment';

export default function FooterWrapper(props) {
  const { isBlogPostPage, metadata, ...o } = useBlogPost();
  return (
    <>
      {isBlogPostPage && <FbComment pathname={metadata?.permalink} />}
      <Footer {...props} />
    </>
  );
}
