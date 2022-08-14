const fs = require("fs");
const path = require("path");

const yaml = require("yaml");

// To keep Markdown relatively clean, I keep alt text for images in a yaml file per post
// as this lets me write longer captions without shortcodes being unwieldy. Makes things easier
// to port around in the long term too (or process for other purposes) I suppose too. I don't
// bother with error handling since I'd rather have the pipeline crash than render bad
// alt text.
module.exports = {
  staticExtras: function (data) {
    const imagePath = path.join("img", data.page.url);
    const videoPath = path.join("video", data.page.url);
    const altPath = path.join(imagePath, "alt.yml");
    const extras = {
      imagePath,
      videoPath,
      altTags: {},
    }
    if (!fs.existsSync(altPath)) return extras;
    const captionFile = fs.readFileSync(altPath, "utf-8");
    return {
      ...extras,
      altTags: yaml.parse(captionFile),
    };
  },
};
