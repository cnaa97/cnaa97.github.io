import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

export default function FooterWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  return (
    <>
      {isBlogPostPage && <div className='mt-8'>
        <div className="fb-comments" data-numposts="10" data-lazy="false" data-width="100%" />
      </div>}
      <Footer {...props} />
    </>
  );
}
