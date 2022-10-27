import type { FC, PropsWithChildren } from "react";
import React from "react";

import { Seo } from "components";
import { type PageProps, seo_list } from "utils";

// wrap all pages of Next.js with this component
const Page: FC<PropsWithChildren & PageProps> = ({ children, name }) => {
  // fetch meta tag info for SEO
  const getSeoList = () => {
    if (seo_list[name]) {
      return seo_list[name];
    }
  };

  const props = getSeoList();
  return (
    <section>
      <Seo {...props} />
      {children}
    </section>
  );
};

export default Page;
