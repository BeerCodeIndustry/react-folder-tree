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
  activeId: undefined,
})

export const FolderTreeProvider: React.FC<FolderTreeProviderType> = ({
  onFileClick,
  children,
  theme,
  overrideTheme,
  activeId,
}) => {
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
      onBlur,
    }),
    [onFileClick, activeNodeId],
  )

  return (
    <ThemeProvider theme={currTheme[theme]}>
      <FolderTreeContext.Provider value={state}>
        {children}
      </FolderTreeContext.Provider>
    </ThemeProvider>
  )
}
