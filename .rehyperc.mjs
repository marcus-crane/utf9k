import rehypeShiki from '@shikijs/rehype'
import rehypeFormat from 'rehype-format'
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
    }],
    [rehypeFormat, { indent: 2 }]
  ]
}
