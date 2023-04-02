import React, { createContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import {
  FolderTreeContextType,
  FolderTreeProviderType,
  Node,
  Theme,
  ThemeObj,
} from '../FolderTree.types'
import { themes } from '../constants'

export const FolderTreeContext = createContext<FolderTreeContextType>({
  onRowClick: () => {},
  onBlur: () => {},
  onCheck: () => {},
  canSelect: false,
  activeId: undefined,
  selected: [],
})

export const FolderTreeProvider: React.FC<FolderTreeProviderType> = ({
  onFileClick,
  children,
  theme,
  overrideTheme,
  activeId,
  handleCheck,
  canSelect: _canSelect = false,
}) => {
  const canSelect = useMemo(() => _canSelect, [_canSelect])
  const [selected, setSelected] = useState<string[]>([])
  const [activeNodeId, setActiveId] =
    useState<FolderTreeProviderType['activeId']>(activeId)
  const currTheme: Record<Theme, ThemeObj> = useMemo(
    () => ({
      dark: {
        ...themes.dark,
        ...overrideTheme?.dark,
      },
      light: {
        ...themes.light,
        ...overrideTheme?.light,
      },
    }),
    [overrideTheme, theme],
  )

  const onRowClick = (id: Node['id'], isFolder?: boolean): void => {
    if (!isFolder) onFileClick(id!)
    setActiveId(id)
  }

  // TODO: check tree structure
  const onCheck = (id: Node['id']): void => {
    const newSelected = selected.includes(id!)
      ? selected.filter(_id => _id !== id)
      : [...selected, id!]

    if (handleCheck) handleCheck(newSelected)
    setSelected(newSelected)
  }

  const onBlur = (): void => {
    setActiveId(undefined)
  }

  useEffect(() => {
    setActiveId(activeId)
  }, [activeId])

  const state = useMemo(
    () => ({
      onRowClick,
      activeId: activeNodeId,
      selected,
      onCheck,
      onBlur,
      canSelect,
    }),
    [onFileClick, activeNodeId, selected, canSelect],
  )

  return (
    <ThemeProvider theme={currTheme[theme]}>
      <FolderTreeContext.Provider value={state}>
        {children}
      </FolderTreeContext.Provider>
    </ThemeProvider>
  )
}
