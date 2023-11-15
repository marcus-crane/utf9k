import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = `Around ${Math.ceil(readingTime.minutes)} minute`
    if (readingTime.minutes > 1) {
      data.astro.frontmatter.minutesRead += 's'
    }
  };
}
