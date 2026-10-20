import { render } from 'pele'
import { fromHtml } from 'hast-util-from-html'
import { toString } from 'hast-util-to-string'
import { visit } from 'unist-util-visit'

export default function rehypePele() {
  return (tree, file) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'pre') return
      if (!parent) return
      const code = node.children.find(child => child.tagName === 'code')
      if (!code?.properties.className?.includes('language-mermaid')) return

      try {
        const { svg } = render(toString(code))
        parent.children[index] = {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['diagram'] },
          children: fromHtml(svg, { fragment: true, space: 'svg' }).children
        }
      } catch (error) {
        file.message(`Pele could not render a diagram: ${error.message}`, node)
      }
    })
  }
}