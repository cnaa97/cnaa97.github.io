import React, { useEffect, useRef } from "react";
import { has } from "lodash/object";

const FbComment = ({ pathname, className }: { pathname: string; className?: string }) => {
  const fbRef = useRef(null);
  
  useEffect(() => {
    if (globalThis.document && has(globalThis.window, "FB")) {
      globalThis.FB.XFBML.parse(fbRef.current);
    }
  }, []);

  return (
    <div ref={fbRef} className={className}>
      <div
        className="fb-comments"
        data-href={`${globalThis?.location?.origin}${pathname}`}
        data-width="100%"
        data-numposts="10"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default FbComment;