import { DeepPartial, merge } from "lume/core/utils/object.ts";
import { Page } from "lume/core/file.ts";

import Site from "lume/core/site.ts";

export interface Options {
  /** The query to search the pages */
  output: "netlify" | "vercel" | "html";

  /** The status code to use */
  status: Status;
}

type Status = 301 | 302 | 307 | 308;
type Redirect = [string, string, Status];

export const defaults: Options = {
  output: "html",
  status: 301,
};

/** Export strategies */
const exports = {
  netlify(redirects: Redirect[], site: Site) {
    const content = redirects.map(([from, to, code]) => `${from} ${to} ${code}`)
      .join("\n");
    site.pages.push(Page.create({ content, url: "_redirects" }));
  },

  vercel(redirects: Redirect[], site: Site) {
    const config = {
      redirects: redirects.map(([source, destination, statusCode]) => ({
        source,
        destination,
        statusCode,
      })),
    };
    site.pages.push(
      Page.create({ content: JSON.stringify({ config }), url: "vercel.json" }),
    );
  },
  html(redirects: Redirect[], site: Site) {
    redirects.forEach(([from, to]) => {
      const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <link rel="canonical" href="${to}">
  <meta http-equiv="refresh" content="0; url=${to}">
</head>
<body>
  <h1>Redirecting…</h1>
  <a href="${to}">Click here if you are not redirected.</a>
</body>
</html>`;
      site.pages.push(Page.create({ url: from, content }));
    });
  },
};

export default function (userOptions?: DeepPartial<Options>) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.process("*", (pages) => {
      const redirects: Redirect[] = [];

      pages.forEach((page) => {
        const url = page.data.url;
        const aliases = page.data.aliases as string[] | undefined;

        if (url && aliases) {
          aliases.forEach((u) => redirects.push(parseRedirection(url, u, options.status)));
        }
      });

      if (!redirects.length) {
        return;
      }

      exports[options.output](redirects, site);
    });
  };
}

const validStatusCodes = [301, 302, 307, 308];

function parseRedirection(
  newUrl: string,
  alias: string,
  defaultCode: Status,
): [string, string, Status] {
  const [from, code] = alias.split(/\s+/);
  const parsedCode = code ? parseInt(code) : defaultCode;

  if (!validStatusCodes.includes(parsedCode)) {
    throw new Error(
      `Invalid status code for redirection from ${from} to ${newUrl} (${code}).`,
    );
  }

  return [from, newUrl, parsedCode as Status];
}