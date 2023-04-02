import { FlexboxProps } from '@beercode/common-frontend'
import { ReactNode } from 'react'

export interface FolderTreeProps {
  tree: Tree
  activeId?: Node['id']
  onFileClick: (id: NonNullable<Node['id']>) => void
  handleCheck?: (id: string[]) => void
  canSelect?: boolean
  theme?: Theme
  overrideTheme?: Partial<Record<Theme, Partial<ThemeObj>>>
  showLines?: boolean
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
  onRowClick: (id: Node['id'], isFolder?: boolean) => void
  onBlur: () => void
  onCheck: (id: Node['id']) => void
  selected: string[]
  canSelect: boolean
}

export type RowProps = {
  children: ReactNode
  id?: string
  onClick: (e: React.MouseEvent<HTMLElement>) => void
} & FlexboxProps

export interface FolderTreeProviderType {
  theme: Theme
  overrideTheme?: FolderTreeProps['overrideTheme']
  children: ReactNode
  onFileClick: FolderTreeProps['onFileClick']
  activeId: Node['id']
  handleCheck?: (id: string[]) => void
  canSelect?: boolean
}

export interface ThemeObj {
  textColor: string
  hover: string
  active: string
  lines: string
  showLines: boolean
}
