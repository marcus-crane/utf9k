/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Root} Root
 */

import {visit} from 'unist-util-visit'

/**
 * Wrap images in pictures.
 *
 * 
 * @returns
 *   Transform.
 */
export default function rehypePostImageWrapper() {

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'element', function (node, index, parent) {
      if (
        typeof index !== 'number' ||
        node.tagName !== 'img'
      ) {
        return
      }

      parent.children[index] = {
        type: 'element',
        tagName: 'center',
        children: [
          {
            type: 'element',
            tagName: 'figure',
            children: [node]
          }
        ]
      }
    })
  }
}
