import rehypeShiki from '@shikijs/rehype'
import rehypePele from './.rehype-pele.mjs'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight
} from '@shikijs/transformers'

export default {
  plugins: [
    rehypePele,
    [rehypeShiki, {
      themes: {
        light: 'monokai',
        dark: 'rose-pine-moon'
      },
      defaultColor: false,
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerMetaHighlight(),
        transformerMetaWordHighlight()
      ]
    }]
  ]
}
