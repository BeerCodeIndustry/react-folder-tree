import { Node, Tree } from '../FolderTree.types'

export const findNode = (data: Tree, id?: string): Node | undefined => {
  return data.find(node => {
    if (node.id === id) return true

    if (node.type === 'folder' && node.files) return findNode(node.files, id)

    return false
  })
}
