import rehypeShiki from '@shikijs/rehype'
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
    }]
  ]
}
