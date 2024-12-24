import lume from "lume/mod.ts";

import remark from "lume/plugins/remark.ts"

const site = lume({
  location: new URL("https://utf9k.net"),
  server: {
    open: true,
    port: 1313
  },
});

site.use(remark())

export default site;
