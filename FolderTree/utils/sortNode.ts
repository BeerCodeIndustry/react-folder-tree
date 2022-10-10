import { cloneDeep } from '@beercode/common-utils'

import { Node, Tree } from '../FolderTree.types'

export const sortNode = (tree: Tree): Tree => {
  return cloneDeep(tree).sort((a: Node, b: Node) => {
    if (a.type === b.type) return 0

    if (a.type === 'folder') return -1

    if (b.type === 'folder') return 1

    return 0
  })
}

export const reqSort = (tree: Tree, parentId?: string): Tree => {
  return sortNode(tree).map(node => {
    const id = `${parentId ? `${parentId}` : ''}/${node.name}`

    if (node.type === 'folder' && node.files)
      return {
        ...node,
        id,
        files: reqSort(node.files, id),
      }

    return {
      ...node,
      id,
    }
  })
}
