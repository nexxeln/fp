import React from "react";
import { useRouter } from "next/router";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s • fp_",
      };
    } else {
      return {
        title: "fp_",
      };
    }
  },
  logo: <strong>fp_</strong>,
  docsRepositoryBase: "https://github.com/nexxeln/fp/docs/pages",
  feedback: {
    content: null,
  },
  project: {
    link: "https://github.com/nexxeln/fp",
  },
  // ...
};
