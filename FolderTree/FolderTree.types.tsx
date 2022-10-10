import { ReactNode } from 'react'

export interface FolderTreeProps {
  tree: Tree
  activeId?: Node['id']
  onFileClick: (id: NonNullable<Node['id']>) => void
  theme?: Theme
  overrideTheme?: Record<Theme, ThemeObj>
}

export type Theme = 'dark' | 'light'

export type Tree = Node[]

export type Node = Folder | File

export interface Folder {
  type: 'folder'
  name: string
  files?: Tree
  id?: string
}

export interface File {
  type: 'file'
  name: string
  id?: string
}

export interface FolderTreeContextType {
  activeId: Node['id']
  onRowClick: (id?: Node['id'], isFolder?: boolean) => void
  onBlur: () => void
}

export interface FolderTreeProviderType {
  theme: Theme
  overrideTheme?: Record<Theme, ThemeObj>
  children: ReactNode
  onFileClick: FolderTreeProps['onFileClick']
  activeId: Node['id']
}

export interface ThemeObj {
  textColor: string
  hover: string
  active: string
  lines: string
}
